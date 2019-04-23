class AdapterComment {
  constructor(data) {
    this.author = data[`author`];
    this.emoji = data[`emotion`];
    this.text = data[`comment`];
    this.date = data[`date`];
  }

  static parseComment(data) {
    return new AdapterComment(data);
  }

  static parseComments(data) {
    return data.map(AdapterComment.parseComment);
  }

  compose() {
    return {
      'author': this.author,
      'emotion': this.emoji,
      'comment': this.text,
      'date': this.date
    };
  }
}

export default AdapterComment;
