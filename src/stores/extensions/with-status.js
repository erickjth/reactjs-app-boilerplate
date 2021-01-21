import { observable, reaction } from 'mobx';
import { STATUSES } from 'constants/statuses';

export const DEFAULT_RESOURCE_NAME = 'default';

/**
 * Adds a status field to the model often for tracking api access.
 *
 * This property is a string which can be observed, but will not
 * participate in any serialization.
 *
 * Use this to extend your models:
 *
 * ```ts
 *   types.model("MyModel")
 *     .props({})
 *     .actions(self => ({}))
 *     .extend(withStatus) // <--- time to shine baby!!!
 * ```
 *
 * This will give you these 3 options:
 *
 *   .status            // returns a string for global
 *   .setStatus("done") // change the status and trigger an mst action
 *   or
 *   .setStatus("done", "<resourceName>")
 *
 * To get the specific status:
 *    .getStatus() // return global
 *    or
 *   .getStatus("<resourceName>")
 */
export const withStatus = self => {
	/**
	 * The observable backing store for the status field.
	 */
	const statuses = observable.map();
	const reactions = {};

	function setupIdleReaction(observable, resourceName) {
		if (reactions[resourceName]) {
			return;
		}

		let timer;

		// Reaction to go back the status to be idle again after couple ms
		reactions[resourceName] = reaction(
			() => observable.get(resourceName),
			value => {
				if (value === STATUSES.DONE || value === STATUSES.ERROR) {
					if (timer) clearTimeout(timer);
					timer = setTimeout(() => observable.set(resourceName, STATUSES.IDLE), 2000);
				}
			}
		);
	}

	/**
	 * Set the status to something new.
	 *
	 * @param value        The new status.
	 * @param resourceName Specific resource name
	 */
	const setStatus = (value, resourceName = DEFAULT_RESOURCE_NAME) => {
		statuses.set(resourceName, value);
		// Setup reaction to put back idle status
		setupIdleReaction(statuses, resourceName);
	};

	const getStatus = (resourceName = DEFAULT_RESOURCE_NAME) => {
		return statuses.get(resourceName);
	};

	return {
		views: {
			// a getter
			get status() {
				return getStatus();
			},
			// as setter
			set status(value) {
				setStatus(value);
			},
			getStatus,
		},
		actions: {
			setStatus,
		},
	};
};
