class AdapterComment {

  constructor(data) {
    this.author = data[`author`];
    this.emoji = data[`emotion`];
    this.text = data[`comment`];
    this.date = data[`date`];
  }

  compose() {
    return {
      'author': this.author,
      'emotion': this.emoji,
      'comment': this.text,
      'date': this.date
    };
  }

  static parseComments(data) {
    return data.map(AdapterComment._parseComment);
  }

  static _parseComment(data) {
    return new AdapterComment(data);
  }

}

export default AdapterComment;
