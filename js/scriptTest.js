export default function testScript () {
    d3.select("body")
        .append("p")
        .attr("id", "test")
        .text("Скрипт работает");
}