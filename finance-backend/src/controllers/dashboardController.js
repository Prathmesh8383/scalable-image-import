const prisma = require("../utils/prisma");

// Summary API
exports.getSummary = async (req, res) => {
  try {
    const income = await prisma.financialRecord.aggregate({
      _sum: { amount: true },
      where: { type: "income" },
    });

    const expense = await prisma.financialRecord.aggregate({
      _sum: { amount: true },
      where: { type: "expense" },
    });

    const totalIncome = income._sum.amount || 0;
    const totalExpense = expense._sum.amount || 0;

    res.json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching summary" });
  }
};

// Category-wise totals
exports.getCategoryWise = async (req, res) => {
  try {
    const data = await prisma.financialRecord.groupBy({
      by: ["category"],
      _sum: { amount: true },
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching category data" });
  }
};