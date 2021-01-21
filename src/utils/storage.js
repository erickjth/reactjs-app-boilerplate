const promisify = fn => {
	return new Promise((resolve, reject) => {
		try {
			const value = fn.call(null);
			resolve(value);
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function loadString(key) {
	return promisify(() => window.localStorage.getItem(key));
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function saveString(key, value) {
	try {
		await promisify(() => window.localStorage.setItem(key, value));
		return true;
	} catch {
		return false;
	}
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function load(key) {
	try {
		const value = await promisify(() => window.localStorage.getItem(key));
		return JSON.parse(value);
	} catch {
		return null;
	}
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function save(key, value) {
	try {
		await promisify(() => window.localStorage.setItem(key, JSON.stringify(value)));
		return true;
	} catch {
		return false;
	}
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export async function remove(key) {
	try {
		await promisify(() => window.localStorage.removeItem(key));
	} catch {}
}

/**
 * Burn it all to the ground.
 */
export async function clear() {
	try {
		await promisify(() => window.localStorage.clear());
	} catch {}
}
