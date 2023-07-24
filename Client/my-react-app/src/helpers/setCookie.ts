export default function setCookie  (name:string, value:any, daysToExpire:number) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);
    const cookieValue = encodeURIComponent(value) + (daysToExpire ? "; expires=" + expirationDate.toUTCString() : "");
    document.cookie = name + "=" + cookieValue + "; path=/";
}

  