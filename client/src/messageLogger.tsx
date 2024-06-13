export const red = "color: #FF5555;";
export const blue = "color: #5555FF;";
export const green = "color: #55FF55;";
export const orange = "color: #FFAA00;";

export function logError(msg: any) {
  console.log(`%c${msg}`, red);
}
export function logInfo(msg: any) {
  console.log(`%c${msg}`, blue);
}
export function logSuccess(msg: any) {
  console.log(`%c${msg}`, green);
}
export function logWarning(msg: any) {
  console.log(`%c${msg}`, orange);
}
