const BASE_URL = "https://server-8ixh.onrender.com";

export default class CommunicationServer {
  static async delete(ticketId) {
    const response = await fetch(
      `${BASE_URL}/?method=deleteTicket&id=${ticketId}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    return data;
  }
  static async update(ticketId, changeTicket) {
    const response = await fetch(
      `${BASE_URL}/?method=changeTicket&id=${ticketId}`,
      {
        method: "PATCH",
        body: changeTicket,
      }
    );
    const data = await response.json();
    return data;
  }
  static async create(newTicket) {
    const response = await fetch(`${BASE_URL}/?method=createTicket`, {
      method: "POST",
      body: newTicket,
    });
    const data = await response.json();
    return data;
  }
  static async get(id) {
    const response = await fetch(`${BASE_URL}/?method=ticketById&id=${id}`);
    const data = await response.json();
    return data;
  }
  static async all() {
    const response = await fetch(`${BASE_URL}/?method=allTickets`);
    const data = await response.json();
    return data;
  }
}