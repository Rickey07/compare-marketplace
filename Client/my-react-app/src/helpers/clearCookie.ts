export default function clearCookie(nameOfCookie:string):void {
    document.cookie = nameOfCookie + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}