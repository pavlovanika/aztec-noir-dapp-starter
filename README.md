# Private Storage dApp (Noir + Aztec)

Пример простейшего приватного контракта на **Noir** и скрипта на **Aztec.js**.

---

## 🧩 Контракт: `main.nr`

```rust
contract main {
    // приватное состояние
    field private_value;

    // инициализация
    fn constructor(initial: field) {
        private_value = initial;
    }

    // приватная запись
    fn set_value(new_value: field) {
        private_value = new_value;
    }

    // приватное чтение
    fn get_value() -> field {
        private_value
    }
}
