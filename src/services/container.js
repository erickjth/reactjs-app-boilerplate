export default class Container {
	dependencies;
	factories;

	constructor() {
		this.dependencies = {};
		this.factories = {};
	}

	register(name, dependency) {
		this.dependencies[name] = dependency;
	}

	factory(name, factory) {
		this.factories[name] = factory;
	}

	get(name) {
		if (!this.dependencies[name]) {
			const factory = this.factories[name];
			if (factory) {
				this.dependencies[name] = this.resolve(factory);
			} else {
				throw new Error('No module found for: ' + name);
			}
		}
		return this.dependencies[name];
	}

	replace(name, dependency) {
		if (this.dependencies[name]) {
			this.dependencies[name] = dependency;
		}
	}

	resolve(factory) {
		return factory.call(null, this);
	}
}
