import React from "react";
import Link from "next/link";

const nfaDependencyVersion =
  require("../package.json").dependencies["next-firebase-auth"];
const nextDependencyVersion = require("../package.json").dependencies.next;
const firebaseDependencyVersion =
  require("../package.json").dependencies.firebase;

const styles = {
  container: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 16,
  },
  versionsContainer: {
    marginLeft: 0,
    marginRight: "auto",
  },
  button: {
    marginLeft: 16,
    cursor: "pointer",
  },
};

const Header = ({ email, signOut }) => (
  <div class="bg-gray-800 sticky text-white h-4" style={styles.container}>
    <p>Signed in as {email}</p>
    <button
      type="button"
      onClick={() => {
        signOut();
      }}
      style={styles.button}
    >
      Sign out
    </button>
  </div>
);

export default Header;
