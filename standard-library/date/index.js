//////////////////////////////////////////////////////////////////////
// date.js
//////////////////////////////////////////////////////////////////////
class Date {


    //////////////////////////////////////////////////////////////////////
    // Get timezone name
    //////////////////////////////////////////////////////////////////////
    static GetTimezoneName(date = null) {
        const d = date === null ? new Date() : date;
        return Intl.DateTimeFormat(d).resolvedOptions().timeZone;
    }


    //////////////////////////////////////////////////////////////////////
    // Get timezone offset string
    //////////////////////////////////////////////////////////////////////
    static GetTimezoneOffsetString(date = null) {
        const d = date === null ? new Date() : date;
        const offset = d.getTimezoneOffset();
        const absOffset = Math.abs(offset);
        return (offset < 0 ? '+' : '-') + ('00' + Math.floor(o / 60)).slice(-2) + ':' + ('00' + (o % 60)).slice(-2);
    }

}
export { Date };
