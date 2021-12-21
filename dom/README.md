# noknow-dom

## Install

```console
npm install @noknow/dom
```

## Usage

### Example 1

```html
<ul>
  <li><p>Hello</p></li>
  <li><p class="noknow love">World</p></li>
</ul>
```

```
const helloP = NkwDom.
    NewHtmlElement('P').
    SetContentList(['Hello']).
    GetHtmlElement();
const helloLi = NkwDom.
    NewHtmlElement('LI').
    SetContentList([helloP]).
    GetHtmlElement();
cosnt worldP = NkwDom.
    NewHtmlElement('P').
    SetClassList(['noknow', 'love']).
    SetContentList(['World']).
    GetHtmlElement();
const worldLi = NkwDom.
    NewHtmlElement('LI').
    SetContentList([worldLi]).
    GetHtmlElement();
const ul = NkwDom.
    NewHtmlElement('UL').
    SetContentList([helloLi, worldLi]).
    GetHtmlElement();
```
