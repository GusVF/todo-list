//src/vite-env.d.ts

/// <reference types="vite/client" />
/// <reference types="@testing-library/jest-dom" />
import { JestMatchers } from 'jest';

interface Window {
  screen: JestMatchers<HTMLElement>;
}
