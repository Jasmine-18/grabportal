import cliProgress from 'cli-progress';

export default class Progress {
  constructor() {
    this._progress = new cliProgress.MultiBar(
      {
        clearOnComplete: false,
        stopOnComplete: true,
        hideCursor: true,
      },
      cliProgress.Presets.shades_classic
    );
    this._bars = {};
  }

  addBar(name, total) {
    this._bars[name] = this._progress.create(total, 0);
  }

  increment(name) {
    this._bars[name].increment();
  }
}
