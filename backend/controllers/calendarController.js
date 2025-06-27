const Events = require('../modules/event');

const createEvent = async (req, res) => {
  console.log(req.body);

  const { task, employee, start_time, end_time, id_owner } = req.body;

  if (!task || !employee || !start_time || !end_time) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newEvent = new Events({
      task,
      employee,
      start_time: new Date(start_time), // Chuyển đổi thời gian sang đối tượng Date
      end_time: new Date(end_time),
      id_owner,
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Error creating event" });
  }
};

const getEvents = async (req, res) => {
  try {
    const userId = req.query.userId;
    const events = await Events.find({id_owner:userId});

    // Định dạng lại dữ liệu trước khi gửi
    const formattedEvents = events.map(event => ({
      id: event._id,
      task: event.task,
      employee: event.employee,
      start_time: event.start_time, // Trường start_time
      end_time: event.end_time,     // Trường end_time
      id_owner: event.id_owner,
      createdAt: event.createdAt,
    }));

    res.json(formattedEvents);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Error fetching events" });
  }
};

const deleteEvents = async (req, res) => {
  try {
    const { id } = req.params; 
    const { id_owner } = req.query; 
    const deletedEvent = await Events.findOneAndDelete({ _id: id, id_owner });

    if (!deletedEvent) {
      return res.status(404).json({ message: "Sự kiện không tồn tại hoặc không hợp lệ" });
    }

    res.status(200).json({ message: "Xóa sự kiện thành công", deletedEvent });
  } catch (error) {
    console.error("Error deleting events:", error);
    res.status(500).json({ error: "Error deleting events" });
  }
};

const updateEvent = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params; // Lấy ID từ URL
    const { task, employee, start_time, end_time, id_owner } = req.body;

    // Kiểm tra nếu thiếu dữ liệu
    if (!task || !employee || !start_time || !end_time) {
      return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin" });
    }

    // Tìm và cập nhật sự kiện theo ID
    const updatedEvent = await Events.findByIdAndUpdate(
      id,
      { task, employee, start_time, end_time, id_owner },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Sự kiện không tồn tại" });
    }

    res.status(200).json({ message: "Cập nhật sự kiện thành công", event: updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi cập nhật sự kiện" });
  }
};

module.exports = {
  createEvent,
  getEvents,
  deleteEvents,
  updateEvent
};