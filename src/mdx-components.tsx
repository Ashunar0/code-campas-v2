import type { MDXComponents } from "mdx/types";
import PreWithCopy from "./components/md/PreWithCopy";
import InlineCode from "./components/md/InlineCode";
import H1 from "./components/md/H1";
import H2 from "./components/md/H2";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    pre: (props) => <PreWithCopy {...props} />,
    code: (props) => <InlineCode {...props} />,
    h1: (props) => <H1 {...props} />,
    h2: (props) => <H2 {...props} />,
    ...components,
  };
}
