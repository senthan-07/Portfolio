/**
 * Procedural sound — no audio files.
 * A low two-oscillator drone through a breathing low-pass filter,
 * plus short triangle blips for interactions.
 */
type Listener = (on: boolean) => void

class Synth {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private droneGain: GainNode | null = null
  private listeners = new Set<Listener>()
  enabled = false

  private init() {
    if (this.ctx) return
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new Ctx()
    const master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)

    // Drone: A1 sine + slightly detuned E2 triangle, filtered.
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 420
    filter.Q.value = 0.7
    const droneGain = ctx.createGain()
    droneGain.gain.value = 0.05
    filter.connect(droneGain).connect(master)

    const freqs: [OscillatorType, number, number][] = [
      ['sine', 55, 0],
      ['triangle', 82.41, 4],
      ['sine', 110, -3],
    ]
    for (const [type, f, detune] of freqs) {
      const o = ctx.createOscillator()
      o.type = type
      o.frequency.value = f
      o.detune.value = detune
      const g = ctx.createGain()
      g.gain.value = type === 'triangle' ? 0.35 : 0.6
      o.connect(g).connect(filter)
      o.start()
    }

    // Slow LFO on the filter so the drone breathes.
    const lfo = ctx.createOscillator()
    lfo.frequency.value = 0.07
    const lfoDepth = ctx.createGain()
    lfoDepth.gain.value = 180
    lfo.connect(lfoDepth).connect(filter.frequency)
    lfo.start()

    this.ctx = ctx
    this.master = master
    this.droneGain = droneGain
  }

  toggle() {
    this.init()
    const ctx = this.ctx!
    if (ctx.state === 'suspended') void ctx.resume()
    this.enabled = !this.enabled
    const now = ctx.currentTime
    this.master!.gain.cancelScheduledValues(now)
    this.master!.gain.setTargetAtTime(this.enabled ? 0.9 : 0, now, 0.35)
    if (this.enabled) this.blip(1320, 0.05)
    this.listeners.forEach((l) => l(this.enabled))
  }

  /** Short percussive tick. */
  blip(freq = 880, gain = 0.035, type: OscillatorType = 'triangle') {
    if (!this.enabled || !this.ctx || !this.master) return
    const ctx = this.ctx
    const t = ctx.currentTime
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = type
    o.frequency.setValueAtTime(freq, t)
    o.frequency.exponentialRampToValueAtTime(freq * 0.5, t + 0.12)
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(gain, t + 0.005)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14)
    o.connect(g).connect(this.master)
    o.start(t)
    o.stop(t + 0.16)
  }

  hover() {
    this.blip(1760, 0.012, 'sine')
  }
  click() {
    this.blip(660, 0.05)
  }
  /** Called when the scroll crosses into a new scene — pitch climbs with depth. */
  scene(index: number) {
    this.blip(220 * Math.pow(2, index / 6), 0.04, 'sine')
    if (this.droneGain && this.ctx) {
      this.droneGain.gain.setTargetAtTime(0.04 + index * 0.006, this.ctx.currentTime, 0.8)
    }
  }

  subscribe(l: Listener) {
    this.listeners.add(l)
    return () => {
      this.listeners.delete(l)
    }
  }
}

export const synth = new Synth()
