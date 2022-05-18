class TimestampUtils {
  /**
   * Returns a date string e.g. 01/01/1970 from a given timestamp
   * @param timestamp The timestamp in milliseconds
   */
  static getDateString(timestamp: number): string {
    const date = new Date(timestamp);
    return (
      this.prettyPrint((date.getMonth() + 1).toString()) +
      '/' +
      this.prettyPrint((date.getDate() + 1).toString()) +
      '/' +
      date.getFullYear()
    );
  }

  /**
   * Returns a time string e.g. 2:22 PM from a given timestamp
   * @param timestamp The timestamp in milliseconds
   */
  static getTimeString(timestamp: number): string {
    const date = new Date(timestamp);
    const timeString = date.toLocaleTimeString();
    const tokens = timeString.split(':');
    const lastPart = Number.parseInt(tokens[0]) >= 12 ? 'PM' : 'AM';
    return tokens[0] + ':' + tokens[1] + ' ' + lastPart;
  }

  static prettyPrint(val: string): string {
    if (Number.parseInt(val) < 10) {
      return '0' + val;
    }
    return val;
  }
}

export default TimestampUtils;
