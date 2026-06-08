"use client";

class AudioSystemClass {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isInitialized = false;
  private isMuted = false;

  // Individual engine gains
  private gainVision: GainNode | null = null;
  private gainCraft: GainNode | null = null;
  private gainExperience: GainNode | null = null;

  // Osc groups to clean up on destroy
  private oscillators: OscillatorNode[] = [];

  constructor() {
    // Client-only check
    if (typeof window !== "undefined") {
      // Listeners could be bound here if needed
    }
  }

  public init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Create engine sub-gains
      this.gainVision = this.ctx.createGain();
      this.gainCraft = this.ctx.createGain();
      this.gainExperience = this.ctx.createGain();

      this.gainVision.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.gainCraft.gain.setValueAtTime(0.0, this.ctx.currentTime);
      this.gainExperience.gain.setValueAtTime(0.0, this.ctx.currentTime);

      this.gainVision.connect(this.masterGain);
      this.gainCraft.connect(this.masterGain);
      this.gainExperience.connect(this.masterGain);

      this.setupVisionEngine();
      this.setupCraftEngine();
      this.setupExperienceEngine();

      this.isInitialized = true;
    } catch (e) {
      console.warn("Failed to initialize Web Audio API", e);
    }
  }

  private setupVisionEngine() {
    if (!this.ctx || !this.gainVision) return;

    // Vision hum: 55Hz (triangle) + 82.5Hz (sine)
    const osc1 = this.ctx.createOscillator();
    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(55, this.ctx.currentTime);

    const osc2 = this.ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(82.5, this.ctx.currentTime);

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(110, this.ctx.currentTime);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(this.gainVision);

    osc1.start();
    osc2.start();
    this.oscillators.push(osc1, osc2);
  }

  private setupCraftEngine() {
    if (!this.ctx || !this.gainCraft) return;

    // Craft chords: A2 (110Hz), E3 (165Hz), C#4 (277Hz), G#4 (415Hz)
    const freqs = [110, 165, 277.18, 415.3];
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(280, this.ctx.currentTime);

    freqs.forEach((f) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);
      
      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.15, this.ctx.currentTime); // balance individual chord notes

      osc.connect(subGain);
      subGain.connect(filter);
      osc.start();
      this.oscillators.push(osc);
    });

    filter.connect(this.gainCraft);
  }

  private setupExperienceEngine() {
    if (!this.ctx || !this.gainExperience) return;

    // Experience: Dreamy 9th chord elements: A3 (220Hz), E4 (329.6Hz), B4 (493.88Hz), F#5 (740Hz)
    const freqs = [220, 329.6, 493.88, 739.99];
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);

    freqs.forEach((f, index) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);

      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

      osc.connect(subGain);
      subGain.connect(filter);
      osc.start();
      this.oscillators.push(osc);

      // Add soft pulsing to higher frequencies using LFO
      if (index >= 2 && this.ctx) {
        const lfo = this.ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.15 + index * 0.05, this.ctx.currentTime);
        const lfoGain = this.ctx.createGain();
        lfoGain.gain.setValueAtTime(0.06, this.ctx.currentTime);
        
        lfo.connect(lfoGain);
        lfoGain.connect(subGain.gain);
        lfo.start();
        this.oscillators.push(lfo);
      }
    });

    filter.connect(this.gainExperience);
  }

  public transitionTo(index: number) {
    if (!this.isInitialized || !this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    const duration = 1.5;

    const targetVision = index === 0 ? 0.4 : 0.0;
    const targetCraft = index === 1 ? 0.35 : 0.0;
    const targetExperience = index === 2 ? 0.3 : 0.0;

    if (this.gainVision) {
      this.gainVision.gain.cancelScheduledValues(t);
      this.gainVision.gain.setValueAtTime(this.gainVision.gain.value, t);
      this.gainVision.gain.linearRampToValueAtTime(targetVision, t + duration);
    }
    if (this.gainCraft) {
      this.gainCraft.gain.cancelScheduledValues(t);
      this.gainCraft.gain.setValueAtTime(this.gainCraft.gain.value, t);
      this.gainCraft.gain.linearRampToValueAtTime(targetCraft, t + duration);
    }
    if (this.gainExperience) {
      this.gainExperience.gain.cancelScheduledValues(t);
      this.gainExperience.gain.setValueAtTime(this.gainExperience.gain.value, t);
      this.gainExperience.gain.linearRampToValueAtTime(targetExperience, t + duration);
    }
  }

  public playHover() {
    if (!this.isInitialized || !this.ctx || this.isMuted) return;

    // Quick sine click/beep
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.012, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch (e) {
      // Audio node fails gracefully if context suspended
    }
  }

  public toggleMute(): boolean {
    if (!this.isInitialized || !this.ctx || !this.masterGain) return this.isMuted;

    const t = this.ctx.currentTime;
    if (this.isMuted) {
      // Unmute
      this.masterGain.gain.cancelScheduledValues(t);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, t);
      this.masterGain.gain.linearRampToValueAtTime(0.4, t + 0.5);
      this.isMuted = false;
      // Resume context if suspended
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    } else {
      // Mute
      this.masterGain.gain.cancelScheduledValues(t);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, t);
      this.masterGain.gain.linearRampToValueAtTime(0.0, t + 0.5);
      this.isMuted = true;
    }
    return this.isMuted;
  }

  public getMutedState() {
    return this.isMuted;
  }

  public getInitialized() {
    return this.isInitialized;
  }
}

export const AudioSystem = new AudioSystemClass();
