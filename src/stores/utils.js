export function MSTAddStaticMethods(model, statics) {
	Object.keys(statics).forEach(k => (model[k] = statics[k]));
	return model;
}
