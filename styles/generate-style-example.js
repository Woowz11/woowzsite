function GetExample(el){
	return `Это элемент [`+el+`]<br>
	<button>Кнопка элемента [`+el+`]</button>`;
}

function GenerateStyleExample(StylePosition){
	
document.addEventListener("DOMContentLoaded", function() {
document.body.innerHTML = `Пустой текст! Blank text! 空白文本！ نص فارغ Κενό κείμενο!<br>
0123456789+-=()_*/|#%<>^[]{}~.,:;№!?"±≤≥≈∞$AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz©®™√≠§█▓▒░÷¬АаБбВвГгДдЕеЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯяЁё€₽£¥←→↑↓∫·°∾∝∅⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾∑☺☹Ææ¢¯¤¦¡¿«»ƒ≡✔❌☥✝卍卐◀▶▲▼⚠☢⚡⚐☮☯☭○∓Δ∀〈〉⋮⋯∬∥∦□⊂⊃∩∪◦‣◼◾●▞Ωαβγδθ♥★♀♂♫₣επ▌▐▀▄▖▗▘▝▙▟▛▜✉×<br>
<font>Font компонент!</font><br>
<span>Span компонент!</span><br>
<p>P компонент!</p>
<b>Жирный текст!</b><br>
<i>Курсивный текст!</i><br>
<s>Зачёркнутый текст!</s><br>
<u>Подчёркнутый текст!</u><br>
<h1>H1 текст!</h1><br>
<h2>H2 текст!</h2><br>
<h3>H3 текст!</h3><br>
<h4>H4 текст!</h4><br>
<h5>H5 текст!</h5><br>
<h6>H6 текст!</h6><br>
<font style="color:red;">Красный Font текст!</font><br>
Текст с <a href="#">ссылкой</a>!<br>
Текст с <abbr>аббревиатурой</abbr>!<br>
Текст с <bdi>изоляцией двунаправленности</bdi>!<br>
Текст с <bdo dir="ltr">переопределением направления текста</bdo>!<br>
Текст с <cite>ссылкой на источник цитаты</cite>!<br>
Текст с <code>кодом</code>!<br>
Текст с <dfn>элементом определения</dfn>!<br>
Текст с <em>элементом акцентирования</em>!<br>
Текст с <kbd>элементов ввода с клавиатуры</kbd>!<br>
Текст с <mark>выделеным текстом</mark>!<br>
Текст с <q>цитатой</q>!<br>
Текст с <samp>примером ввода</samp>!<br>
Текст с <small>комментарием</small>!<br>
Текст с <strong>важным сообщением</strong>!<br>
Текст с временем <time>2:51</time>!<br>
Текст с переменной <var>X</var>!<br>
<div>`+GetExample("div")+`</div><br>
<header>`+GetExample("header")+`</header><br>
<main>`+GetExample("main")+`</main><br>
<footer>`+GetExample("footer")+`</footer><br>
<nav>`+GetExample("nav")+`</nav><br>
<address>`+GetExample("address")+`</address><br>
<article>`+GetExample("article")+`</article><br>
<aside>`+GetExample("aside")+`</aside><br>
<section>`+GetExample("section")+`</section><br>
<blockquote>Полноценная цитата</blockquote><br>
<div style="width:100px; height:100px;">Div определённого размера</div><br>
<div style="width:100px; height:100px; background-color:red;">Div определённого размера и цвета</div><br>
<figure style="width:100px; height:100px;">Пример иллюстрации<figcaption>Подпись</figcaption></figure><br>
<hr>
Список ul
<ul>
  <li>Первый элемент</li>
  <li>Второй элемент</li>
  <li>Третий элемент</li>
	<ul>
	  <li>Первый элемент</li>
	  <li>Второй элемент</li>
	  <li>Третий элемент</li>
		<ul>
		  <li>Первый элемент</li>
		  <li>Второй элемент</li>
		  <li>Третий элемент</li>
		</ul>
	</ul>
</ul>
Список ol
<ol>
  <li>Первый элемент</li>
  <li>Второй элемент</li>
  <li>Третий элемент</li>
	<ol>
	  <li>Первый элемент</li>
	  <li>Второй элемент</li>
	  <li>Третий элемент</li>
		<ol>
		  <li>Первый элемент</li>
		  <li>Второй элемент</li>
		  <li>Третий элемент</li>
		</ol>
	</ol>
</ol>
Список dl
<dl>
  <dt>Первый элемент</dt>
  <dd>Описание первого элемента</dd>

  <dt>Второй элемент</dt>
  <dd>Описание второго элемента</dd>

  <dt>Третий элемент</dt>
  <dd>Описание третьего элемента</dd>
</dl>
Список menu
<menu>
  <menuitem>Первый элемент</menuitem>
  <menuitem>Второй элемент</menuitem>
  <menuitem>Третий элемент</menuitem>
</menu>
<button>Кнопка</button><br>
<ruby> 漢 <rp>(</rp><rt>kan</rt><rp>)</rp> 字 <rp>(</rp><rt>ji</rt><rp>)</rp> </ruby><br>
H<sub>2</sub>O<br>
2<sup>2</sup>=4
<pre>
                         ______                     
 _________        .---"""      """---.              
:______.-':      :  .--------------.  :             
| ______  |      | :                : |             
|:______B:|      | |  Little Error: | |             
|:______B:|      | |                | |             
|:______B:|      | |  Power not     | |             
|         |      | |  found.        | |             
|:_____:  |      | |                | |             
|    ==   |      | :                : |             
|       O |      :  '--------------'  :             
|       o |      :'---...______...---'              
|       o |-._.-i___/'             \._              
|'-.____o_|   '-.   '-...______...-'  -._          
:_________:       .____________________   -.___.-. 
                 .'.eeeeeeeeeeeeeeeeee.'.      :___:
               .'.eeeeeeeeeeeeeeeeeeeeee.'.         
              :____________________________:
</pre><br>
<img src="../source/specialforrandomsite/bird.png"/><br>
<img src="../source/specialforrandomsite/0001-0120.gif"/><br>
<audio controls src="../source/sun.mp3"></audio><br>
<video src="../source/specialforrandomsite/video_2024-10-19_17-47-26.mp4" controls poster="../source/specialforrandomsite/Clipchamp.gif"></video><br>
<iframe width="800" height="800" src="https://woowz11.github.io/woowzsite/index.html"></iframe><br>
<iframe src="../source/pdf.pdf#toolbar=0" width="800" height="800"></iframe>
`;
});

}