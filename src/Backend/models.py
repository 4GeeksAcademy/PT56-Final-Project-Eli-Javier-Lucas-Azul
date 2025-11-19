from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Float, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


# >>>>>>>>  Modelos de Usuario <<<<<<<< #
class User (db.Model):
    __tablename__ = "Users"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(20), nullable=True)
    email: Mapped[str] = mapped_column(String(50), unique=True, nullable=True)
    password: Mapped[str] = mapped_column(String(200), nullable=True)

    budgets = relationship("Budget", backref="user", lazy=True)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email

        }

# >>>>>>>>  Modelos de Datos Financieros  <<<<<<<< #

class Ingreso(db.Model):
    __tablename__ = "ingresos"
    id: Mapped[int] = mapped_column(primary_key=True)
    description: Mapped[str] = mapped_column(String(200), nullable=False)
    amount: Mapped[float] = mapped_column(Float, nullable=False)
    category: Mapped[str] = mapped_column(
        String(100), nullable=True, default="Otros")
    budget_id: Mapped[int] = mapped_column(
        Integer, db.ForeignKey("budgets.id"), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "description": self.description,
            "amount": self.amount,
            "category": self.category,
            "budget_id": self.budget_id
        }


class Gasto(db.Model):
    __tablename__ = "gastos"
    id: Mapped[int] = mapped_column(primary_key=True)
    description: Mapped[str] = mapped_column(String(200), nullable=False)
    amount: Mapped[float] = mapped_column(Float, nullable=False)
    category: Mapped[str] = mapped_column(String(100), nullable=True)
    budget_id: Mapped[int] = mapped_column(
        Integer, db.ForeignKey("budgets.id"), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "description": self.description,
            "amount": self.amount,
            "category": self.category,
            "budget_id": self.budget_id
        }


class Budget(db.Model):
    __tablename__ = "budgets"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)

    # FIX: foreign key correcta
    user_id = db.Column(db.Integer, db.ForeignKey("Users.id"), nullable=False)

    ingresos = db.relationship("Ingreso", backref="budget", lazy=True, cascade="all, delete")
    gastos = db.relationship("Gasto", backref="budget", lazy=True, cascade="all, delete")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "ingresos": [i.serialize() for i in self.ingresos],
            "gastos": [g.serialize() for g in self.gastos],
            "total_ingresos": sum(i.amount for i in self.ingresos),
            "total_gastos": sum(g.amount for g in self.gastos),
            "balance": sum(i.amount for i in self.ingresos) - sum(g.amount for g in self.gastos)
        }