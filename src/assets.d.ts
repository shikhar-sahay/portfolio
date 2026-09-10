// Owner-supplied assets keep their original filenames, including the
// uppercase `.JPG` extension that Next.js default image declarations
// do not cover. This mirrors the `*.jpg` handling exactly.
declare module '*.JPG' {
  const src: import('next/image').StaticImageData;
  export default src;
}
