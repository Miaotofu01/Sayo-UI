/* ═══════════════════════════════════════════════════════════════
   SAYO UI — TypeScript type definitions
   Zero dependencies. GitHub Primer Dark + Sayo interaction engine.
   ═══════════════════════════════════════════════════════════════ */

interface SayoCursorOptions {
  /** Cursor ring diameter in px (default: 16) */
  size?: number;
  /** Ring diameter when hovering interactive elements (default: 22) */
  hoverSize?: number;
  /** Pressed diameter (default: 24) */
  pressSize?: number;
  /** Glow radius normal (default: 40) */
  glowNormal?: number;
  /** Glow radius when hovering interactive elements (default: 55) */
  glowHover?: number;
  /** Glow radius on press (default: 70) */
  glowPress?: number;
  /** Glow opacity normal (default: 0.08) */
  glowIntensity?: number;
  /** Glow opacity when hovering interactive elements (default: 0.12) */
  glowIntensityHover?: number;
  /** Glow opacity on press (default: 0.16) */
  glowIntensityPress?: number;
  /** Accent color — red channel (default: 88, #58a6ff) */
  accentR?: number;
  /** Accent color — green channel */
  accentG?: number;
  /** Accent color — blue channel */
  accentB?: number;
  /** Trail / secondary color — red channel (default: 121, #79c0ff) */
  trailR?: number;
  /** Trail / secondary color — green channel */
  trailG?: number;
  /** Trail / secondary color — blue channel */
  trailB?: number;
}

interface SayoCursor {
  /**
   * Initialise the custom cursor. Always creates the cursor ring element.
   * The ambient glow canvas is skipped when prefers-reduced-motion is active.
   *
   * Triggered automatically by `<body data-syo-cursor>`.
   */
  init(opts?: SayoCursorOptions): void;
  /** Remove cursor ring, glow canvas, and event listeners. Restores system cursor. */
  destroy(): void;
}

/* ──────────────────────────────────────────────────────────────── */

interface SayoTrailOptions {
  /** Number of trail points (default: 25) */
  maxLength?: number;
  /** Trail color — red channel (default: 121, #79c0ff) */
  colorR?: number;
  /** Trail color — green channel */
  colorG?: number;
  /** Trail color — blue channel */
  colorB?: number;
  /** Max trail width in px (default: 5) */
  maxWidth?: number;
  /** Max trail opacity (default: 0.28) */
  maxAlpha?: number;
  /** Scope to a container element (CSS selector or HTMLElement). null = global. */
  container?: string | HTMLElement | null;
}

interface SayoTrail {
  /**
   * Initialise the smooth polyline cursor trail.
   * Skipped automatically when prefers-reduced-motion is active.
   *
   * Triggered automatically by `<body data-syo-trail>`.
   */
  init(opts?: SayoTrailOptions): void;
  /** Remove trail canvas and event listeners. */
  destroy(): void;
}

/* ──────────────────────────────────────────────────────────────── */

interface SayoRippleOptions {
  /** Flash color — red channel (default: 88) */
  flashR?: number;
  /** Flash color — green channel */
  flashG?: number;
  /** Flash color — blue channel */
  flashB?: number;
  /** Ripple ring color — red channel (default: 188) */
  rippleR?: number;
  /** Ripple ring color — green channel */
  rippleG?: number;
  /** Ripple ring color — blue channel */
  rippleB?: number;
  /** Which element to listen on. Default: document. */
  container?: string | HTMLElement;
}

interface SayoRipple {
  /**
   * Initialise click feedback. The flash pulse is always global.
   * The expanding ripple ring is scoped to `[data-syo-ripple]` containers.
   * Skipped automatically when prefers-reduced-motion is active.
   */
  init(opts?: SayoRippleOptions): void;
  /** Remove click listeners. */
  destroy(): void;
}

/* ──────────────────────────────────────────────────────────────── */

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface SayoToastOptions {
  /** Toast variant (default: 'info') */
  type?: ToastType;
  /** Auto-dismiss after ms. 0 = stay until manually closed. (default: 4000) */
  duration?: number;
}

interface SayoToast {
  /**
   * Show an elastic slide-in toast notification.
   *
   * ```ts
   * Sayo.toast.show('File saved', { type: 'success' });
   * Sayo.toast.show('Connection failed', { type: 'error', duration: 6000 });
   * ```
   */
  show(message: string, opts?: SayoToastOptions): void;
  /** Remove the toast container from the DOM. */
  destroy(): void;
}

/* ──────────────────────────────────────────────────────────────── */

interface SayoCountUpOptions {
  /** Starting value (default: 0) */
  from?: number;
  /** Target value (required) */
  to: number;
  /** Animation duration in ms (default: 1500) */
  duration?: number;
}

interface SayoCountUp {
  /**
   * Animate a number from `from` to `to` with quintic ease-out.
   * Adds a blue glow to the closest `.syo-stat` ancestor during animation.
   *
   * ```ts
   * Sayo.countUp.animate(el, { to: 1337, duration: 3000 });
   * ```
   *
   * Or attribute-driven: `<span data-syo-countup="1337">0</span>`
   * (animates on scroll into view via a shared IntersectionObserver).
   */
  animate(el: HTMLElement, opts: SayoCountUpOptions): void;
  /** Scan the DOM for `[data-syo-countup]` elements and observe them. Called automatically on load. */
  init(): void;
}

/* ──────────────────────────────────────────────────────────────── */

interface SayoInertiaOptions {
  /** Deceleration factor per frame (default: 0.92) */
  friction?: number;
  /** Minimum velocity to keep animating (default: 0.5) */
  minVelocity?: number;
}

interface SayoInertiaInstance {
  /** Remove mouse and touch listeners from this instance. */
  destroy(): void;
}

interface SayoInertiaScroll {
  /**
   * Enable momentum drag-scroll with friction on a container.
   * Supports both mouse drag and touch gestures.
   *
   * Triggered automatically by `[data-syo-inertia]`.
   */
  init(el: string | HTMLElement, opts?: SayoInertiaOptions): SayoInertiaInstance | undefined;
}

/* ──────────────────────────────────────────────────────────────── */

interface SayoParallaxOptions {
  /** Max pixel shift per axis (default: 8) */
  maxShift?: number;
  /** Scope to a different container (CSS selector or HTMLElement). Default: parent element. */
  container?: string | HTMLElement;
}

interface SayoParallaxInstance {
  target: HTMLElement;
  container: HTMLElement;
  destroy?(): void;
}

interface SayoParallax {
  /**
   * Make an element follow the mouse within its container.
   * Instant tracking during movement, smooth spring-return on mouseleave.
   * Skipped automatically when prefers-reduced-motion is active.
   */
  init(el: string | HTMLElement, opts?: SayoParallaxOptions): SayoParallaxInstance | undefined;
  /** Destroy one instance, or all if no instance is passed. */
  destroy(instance?: SayoParallaxInstance): void;
}

/* ──────────────────────────────────────────────────────────────── */

interface SayoReveal {
  /**
   * Start observing `.syo-reveal` elements for scroll-triggered entrance.
   * Each sibling group gets a 40ms stagger delay.
   * Skipped automatically when prefers-reduced-motion is active.
   * Called automatically on DOMContentLoaded.
   */
  init(): void;
  /** Scan for new `.syo-reveal` elements added to the DOM. */
  scan(root?: HTMLElement | Document): void;
  /** Disconnect the IntersectionObserver. */
  destroy(): void;
}

/* ──────────────────────────────────────────────────────────────── */

interface SayoDialogOptions {
  /** Dialog title in the header bar. */
  title?: string;
  /** Content — HTML string or DOM element. */
  body?: string | HTMLElement;
  /** Footer — HTML string, single element, or array of elements (usually buttons). */
  footer?: string | HTMLElement | HTMLElement[];
  /** Whether the user can dismiss via ×, overlay click, or Escape. (default: true) */
  closable?: boolean;
}

interface SayoDialogInstance {
  el: HTMLElement;
  overlay: HTMLElement;
  close(): void;
}

interface SayoDialogConfirmOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  closable?: boolean;
}

interface SayoDialogAlertOptions {
  title?: string;
  message?: string;
  okText?: string;
  closable?: boolean;
}

interface SayoDialog {
  /**
   * Show a custom dialog. Returns an instance handle.
   *
   * ```ts
   * const d = Sayo.dialog.show({
   *   title: 'Settings',
   *   body: '<p>Configure your preferences.</p>',
   *   footer: '<button class="syo-btn syo-btn--sm syo-btn--primary">Save</button>',
   * });
   * ```
   */
  show(opts?: SayoDialogOptions): SayoDialogInstance;
  /**
   * Confirmation dialog — returns a Promise that resolves to `true` (confirm)
   * or `false` (cancel / dismiss).
   *
   * ```ts
   * const ok = await Sayo.dialog.confirm({ title: 'Delete', message: 'Sure?' });
   * ```
   */
  confirm(opts?: SayoDialogConfirmOptions): Promise<boolean>;
  /**
   * Alert dialog — returns a Promise that resolves when the user clicks OK
   * or dismisses.
   *
   * ```ts
   * await Sayo.dialog.alert({ title: 'Done', message: 'Saved.' });
   * ```
   */
  alert(opts?: SayoDialogAlertOptions): Promise<void>;
  /** Close the currently open dialog, if any. */
  close(): void;
}

/* ──────────────────────────────────────────────────────────────── */

interface SayoScrollSpyOptions {
  /** Container element or selector that holds the nav links. (default: '[data-syo-scrollspy]') */
  nav?: string | HTMLElement;
  /** Scroll offset in px — accounts for fixed nav height. (default: 80) */
  offset?: number;
  /** CSS class added to the currently active link. (default: 'active') */
  activeClass?: string;
  /** Scroll container element. (default: window) */
  scrollRoot?: HTMLElement | null;
}

interface SayoScrollSpyInstance {
  nav: HTMLElement;
  items: Array<{ el: HTMLElement; link: HTMLAnchorElement }>;
  destroy?(): void;
}

interface SayoScrollSpy {
  /**
   * Initialise scroll spy — highlights nav links as the user scrolls
   * past corresponding sections.
   *
   * Auto-inits on elements with `data-syo-scrollspy` attribute.
   * The attribute value sets the offset in px: `data-syo-scrollspy="100"`.
   */
  init(opts?: SayoScrollSpyOptions): SayoScrollSpyInstance | undefined;
  /** Destroy one instance, or all if no instance is passed. */
  destroy(instance?: SayoScrollSpyInstance): void;
}

/* ──────────────────────────────────────────────────────────────── */

interface SayoDropdownInstance {
  el: HTMLElement;
  close(): void;
  open(e: Event): void;
}

interface SayoDropdown {
  /**
   * Initialise a dropdown menu on a container.
   *
   * Triggered automatically by `[data-syo-dropdown]`.
   */
  init(el: string | HTMLElement): SayoDropdownInstance | undefined;
}

/* ──────────────────────────────────────────────────────────────── */

interface Sayo {
  dialog: SayoDialog;
  dropdown: SayoDropdown;
  scrollSpy: SayoScrollSpy;
  cursor: SayoCursor;
  trail: SayoTrail;
  ripple: SayoRipple;
  toast: SayoToast;
  countUp: SayoCountUp;
  inertiaScroll: SayoInertiaScroll;
  parallax: SayoParallax;
  reveal: SayoReveal;
  /** Destroy all active Sayo modules and restore defaults. */
  destroy(): void;
}

/* ──────────────────────────────────────────────────────────────── */

declare global {
  interface Window {
    Sayo: Sayo;
  }
}

export {};
