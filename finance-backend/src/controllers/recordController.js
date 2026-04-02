const prisma = require("../utils/prisma");

// Create Record
exports.createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, notes, userId } = req.body;

    // Basic validation
    if (!amount || !type || !category || !date || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: "Amount must be greater than 0" });
    }

    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({ message: "Type must be income or expense" });
    }

    const record = await prisma.financialRecord.create({
      data: {
        amount,
        type,
        category,
        date: new Date(date),
        notes,
        userId,
      },
    });

    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating record" });
  }
};

// Get Records WITH FILTERING
exports.getRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;

    const records = await prisma.financialRecord.findMany({
      where: {
        type: type || undefined,
        category: category || undefined,
        date: {
          gte: startDate ? new Date(startDate) : undefined,
          lte: endDate ? new Date(endDate) : undefined,
        },
      },
      include: { user: true },
    });

    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching records" });
  }
};

// Update Record
exports.updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await prisma.financialRecord.update({
      where: { id: Number(id) },
      data,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Error updating record" });
  }
};

// Delete Record
exports.deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.financialRecord.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Record deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting record" });
  }
};