export function themeDidChange(element: HTMLElement, theme: string, prefix: string) {
  if (theme) {
    element.classList.add(`${prefix}-${theme}`);
  }
}

export function themeWillChange(element: HTMLElement, oldTheme: string, prefix: string) {
  if (oldTheme) {
    element.classList.remove(`${prefix}-${oldTheme}`);
  }
}
