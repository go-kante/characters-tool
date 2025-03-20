var character = ['aiueo'] // 環境依存文字の配列
  
const editableBox = document.getElementById('floatingTextarea2');

if (typeof window !== "undefined" && typeof document !== "undefined") {
  const output = document.getElementById('output');
  }
  
if (typeof window !== "undefined" && typeof document !== "undefined") {
  const btn = document.getElementById('btn').addEventListener('click', (event) => {
  event.preventDefault();
  const content = editableBox.value;
  const regex = new RegExp(`[${character.join('')}]`, 'g'); // 配列を正規表現に変換

  if (regex.test(content)) {
    output.textContent = "環境依存文字が含まれています。";
    output.style.color = "red";
  } else {
    output.textContent = "環境依存文字は含まれていません。";
    output.style.color = "green";
    }
  });
}