import { add } from "ramda";

console.log({ env: process.env.NODE_ENV, test: "ts-loader" });

if (process.env.NODE_ENV === "production") {
  console.log("prod");
} else {
  console.log("dev", add(3, 2));
}
