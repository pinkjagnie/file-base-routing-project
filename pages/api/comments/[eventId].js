function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    console.log(newComment);

    res
      .status(201)
      .json({ message: "Success. Comment added", comment: newComment });
  }

  if (req.method === "GET") {
    const dummyCommentList = [
      { id: "c1", name: "Max", text: "A first comment" },
      { id: "c2", name: "Manu", text: "A second comment" },
      { id: "c3", name: "Abc", text: "A third comment" },
    ];

    res.status(200).json({ comments: dummyCommentList });
  }
}

export default handler;
