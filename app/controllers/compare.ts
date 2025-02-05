import Controller from '@ember/controller';
import { treeURL, diffURL } from 'rails-diff/api/github';
import CompareRoute from 'rails-diff/routes/compare';

export default class CompareController extends Controller {
  declare model: Awaited<ReturnType<CompareRoute['model']>>;

  get comparison(): Awaited<ReturnType<CompareRoute['model']>> {
    return this.model;
  }

  get linkedAnchor(): string | undefined {
    return document.URL.split('#', 2)[1];
  }

  get sourceURL(): string {
    return treeURL(this.comparison.sourceVersion);
  }

  get targetURL(): string {
    return treeURL(this.comparison.targetVersion);
  }

  get diffURL(): string {
    return diffURL(this.comparison.sourceVersion, this.comparison.targetVersion);
  }
}

declare module '@ember/controller' {
  interface Registry {
    compare: CompareController;
  }
}
