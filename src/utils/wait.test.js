import wait from "./wait"

// a useful pre-written mock from jest to mock "setTimeout"
jest.useFakeTimers()

test("wait for promise to resolve", async () => {
	const spy = jest.fn()
	// define the function, but don't wait for the promsie to resolve yet
	const waitFn = wait(3, spy)

	// fast forward in time so we don't actually have to wait 3 seconds
	jest.runAllTimers()
	
	// now that we went into the future, we can wait for the promise to resolve
	const result = await waitFn
	
	expect(result).toBe("hurray")

	// we can tell what our spy function has been up to,
	// to make sure it was called by "wait", etc.
	expect(spy).toHaveBeenCalledWith("hurray")
	expect(spy).toHaveBeenCalledTimes(1)
})

// ALT METHOD FOR ASYNC TESTS
// test("wait for promise to resolve", (done) => {
// 	wait(3).then(result => {
// 		expect(result).toBe("hurray")
// 		done()
// 	}).catch(err => {
// 		done(err)
// 	})
// })

// ALT METHOD FOR ASYNC TESTS
// test("wait for promise to resolve", () => {
// 	return wait(3).then(result => {
// 		expect(result).toBe("hurray")
// 	})
// })