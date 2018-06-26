export function themeChanged(element: HTMLElement, theme: string, oldTheme: string, prefix: string) {
  if (oldTheme) {
    element.classList.remove(`${prefix}-${oldTheme}`);
  }

  if (theme) {
    element.classList.add(`${prefix}-${theme}`);
  }
}
