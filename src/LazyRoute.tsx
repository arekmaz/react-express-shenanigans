import { ReactElement, Suspense } from "react";
import { Route, RouteProps } from "react-router-dom";

export default function LazyRoute({
  children,
  ...props
}: RouteProps & { children?: ReactElement }) {
  console.log({ children });
  return (
    <Route {...props}>
      {globalThis.TARGET === "browser" ? (
        <Suspense fallback={<div>loading...</div>}>
          {/* br */}
          <div>{children}</div>
        </Suspense>
      ) : (
        <Route {...props}>{children}</Route>
      )}
    </Route>
  );
}
