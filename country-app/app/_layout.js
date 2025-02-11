import { Slot } from "expo-router";
import { DarkModeProvider } from "../DarkModeContext";

export default function Layout() {
  return (
    <DarkModeProvider>
      <Slot />
    </DarkModeProvider>
  );
}
