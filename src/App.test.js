import axios from "axios"
import React from "react";
// no default export, so we're importing everyting from this library
import * as rtl from "@testing-library/react";
// not importing to a variable, since this just overrides jest global variables
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

// Mock the "axios" library for any code that imports it.
// So any imports now return this instead of the actual axios call.
// Helps our tests to be consistent, and integration tests rather than E2E.
jest.mock("axios", () => {
  return {
    get: jest.fn(() => Promise.resolve({
      data: {
        message: ["foo.jpg", "bar.jpg"]
      }
    }))
  }
})

// this just allows react-testing-library to do some
// routine cleanup after each test runs (to reset the DOM and such)
afterEach(rtl.cleanup);

test("Made API call", async () => {
  const wrapper = rtl.render(<App />);
  // This waits for our initial useEffect async operation to run,
  // which is what makes our API call
  await wrapper.findAllByAltText(/dog/i);

  // Since our mocked axios.get call is a spy, we can see what it has been up to
  expect(axios.get).toHaveBeenCalled()
})

test("Cleared images", async () => {
  const wrapper = rtl.render(<App />);
  await wrapper.findAllByAltText(/dog/i);

  const clear = wrapper.getByText(/clear/i)

  // Simulate the act of a user clicking on the button
  rtl.act(() => {
    rtl.fireEvent.click(clear)
  })

  // Once the button was clicked, the dog images should be gone
  expect(wrapper.queryByAltText(/dog/i)).toBeNull()
})

test("Render the heading", async () => {
  // render our React app into an in-memory DOM so we can test against it
  const wrapper = rtl.render(<App />);
  await wrapper.findAllByAltText(/dog/i);

  // element is now our dom element that we can test against
  const element = wrapper.getByText(/the dog website/i);

  // test will fail if element is not visible to our robot eyes
  expect(element).toBeVisible();
});

test("Render count input", async () => {
  const wrapper = rtl.render(<App />);
  await wrapper.findAllByAltText(/dog/i);

  // using a regular expression instead of a string allows our
  // query to be much more flexible. for example, if the text becomes
  // all uppercase, we don't want our test to break
  const element = wrapper.getByPlaceholderText(/count/i);
  expect(element).toHaveValue(1);
});

test("<App /> snapshot", async () => {
  const wrapper = rtl.render(<App />)
  await wrapper.findAllByAltText(/dog/i);

  // Saves our snapshot to disk, or checks an existing snapshot on the disk.
  // If it looks at all different, the test will fail.
  expect(wrapper.asFragment()).toMatchSnapshot()
})