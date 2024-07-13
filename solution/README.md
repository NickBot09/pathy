- **Functionality Overview**:
  - The application allows viewing a post, saving a post, and deleting all saved posts at once.
  - When viewing a post (e.g., post 1), a `GET` request is made to `/post?postId=1`, loading a page.

- **Embedded Script Behavior**:
  - The script on the page retrieves the `postId` parameter value.
  - It makes a `POST` request to the `/api/v1/posts/postid/1` endpoint to get the content for display.

- **User Control**:
  - The endpoint `/api/v1/posts/postid/<user-input>` is controlled by the user.
  - Supplying `?postId=../../../../foo` results in a request to `/api/v1/posts/postid/../../../../foo`, i.e., `/foo`.

- **Client-Side Path Traversal**:
  - Using `../` in the `postId` parameter, similar to traditional path traversal in Local File Inclusion (LFI) or Local File Read (LFR), allows requests to arbitrary endpoints.
  - Example: Opening `http://localhost:1337/post?postId=../../../../api/v1/posts/delete-post` deletes all saved posts.

- **Attack Execution**:
  - Submitting this URL to the admin user causes all posts saved by the admin to be deleted.
  - After successful deletion, the flag can be retrieved at `/flag`.

By following these steps, you can exploit the client-side path traversal vulnerability to achieve the challenge objective. A solve script is also provided `./solve.js`