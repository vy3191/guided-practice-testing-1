// This function just simulates an async operation like an API call.
export default function(seconds, cb) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve("hurray")
			cb("hurray")
		}, seconds * 1000)
	})
}