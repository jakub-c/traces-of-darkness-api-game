# Todo list

I work on this project in short focused sessions, this list's supposed to keep
me on track when I revisit the codebase

- [ ] write tests to support `options` on all endpoints
- [ ] add handling of failed `fetch` request
- [x] ~~add POST endpoints to HATEOASlinks~~
- [x] ~~support `OPTIONS` request method~~
- [x] turn slug into an array
- [x] ~~create nested URL structure for the API like: `old-house/hallway`~~
- [x] ~~add "image/*" response to the endpoints if an image illustrating the
      endpoint (that is the location on the map) exists~~
- [x] ~~refactor buildApi and subsequent functions~~

## HTTP notes:

- checkout definition of resource:
  https://www.rfc-editor.org/rfc/rfc7231#section-3
- relation between different versions of a resource:
  https://stackoverflow.com/a/35722727
- more on the resources:
  https://www.ibm.com/docs/en/was-nd/9.0.5?topic=applications-defining-resources-in-restful
- https://softwareengineering.stackexchange.com/questions/319202/in-rest-parlance-what-is-the-difference-between-a-resource-and-a-representation
https://httpwg.org/specs/rfc7231.html#header.accept

## HTTP `OPTIONS` notes

- https://stackoverflow.com/questions/11926908/how-to-respond-to-an-http-options-request
- https://zacstewart.com/2012/04/14/http-options-method.html
- https://www.mnot.net/blog/2012/10/29/NO_OPTIONS