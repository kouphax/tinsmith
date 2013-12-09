/*
 * Copyright 2013 The Polymer Authors. All rights reserved.
 * Use of this source code is goverened by a BSD-style
 * license that can be found in the LICENSE file.
 */

suite('Node', function() {

  var wrap = ShadowDOMPolyfill.wrap;
  var unwrap = ShadowDOMPolyfill.unwrap;

  var DOCUMENT_POSITION_DISCONNECTED = Node.DOCUMENT_POSITION_DISCONNECTED;
  var DOCUMENT_POSITION_PRECEDING = Node.DOCUMENT_POSITION_PRECEDING;
  var DOCUMENT_POSITION_FOLLOWING = Node.DOCUMENT_POSITION_FOLLOWING;
  var DOCUMENT_POSITION_CONTAINS = Node.DOCUMENT_POSITION_CONTAINS;
  var DOCUMENT_POSITION_CONTAINED_BY = Node.DOCUMENT_POSITION_CONTAINED_BY;
  var DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;

  test('compareDocumentPosition', function() {
    var div = document.createElement('div');
    div.innerHTML = '<a><b></b><c></c></a>';
    var a = div.firstChild;
    var b = a.firstChild;
    var c = a.lastChild;

    assert.equal(div.compareDocumentPosition(div), 0);
    assert.equal(div.compareDocumentPosition(a),
        DOCUMENT_POSITION_CONTAINED_BY | DOCUMENT_POSITION_FOLLOWING);
    assert.equal(div.compareDocumentPosition(b),
        DOCUMENT_POSITION_CONTAINED_BY | DOCUMENT_POSITION_FOLLOWING);
    assert.equal(div.compareDocumentPosition(c),
        DOCUMENT_POSITION_CONTAINED_BY | DOCUMENT_POSITION_FOLLOWING);

    assert.equal(a.compareDocumentPosition(div),
        DOCUMENT_POSITION_CONTAINS | DOCUMENT_POSITION_PRECEDING);
    assert.equal(a.compareDocumentPosition(a), 0);
    assert.equal(a.compareDocumentPosition(b),
        DOCUMENT_POSITION_CONTAINED_BY | DOCUMENT_POSITION_FOLLOWING);
    assert.equal(a.compareDocumentPosition(c),
        DOCUMENT_POSITION_CONTAINED_BY | DOCUMENT_POSITION_FOLLOWING);

    assert.equal(b.compareDocumentPosition(div),
        DOCUMENT_POSITION_CONTAINS | DOCUMENT_POSITION_PRECEDING);
    assert.equal(b.compareDocumentPosition(a),
        DOCUMENT_POSITION_CONTAINS | DOCUMENT_POSITION_PRECEDING);
    assert.equal(b.compareDocumentPosition(b), 0);
    assert.equal(b.compareDocumentPosition(c),
        DOCUMENT_POSITION_FOLLOWING);

    assert.equal(c.compareDocumentPosition(div),
        DOCUMENT_POSITION_CONTAINS | DOCUMENT_POSITION_PRECEDING);
    assert.equal(c.compareDocumentPosition(a),
        DOCUMENT_POSITION_CONTAINS | DOCUMENT_POSITION_PRECEDING);
    assert.equal(c.compareDocumentPosition(b),
        DOCUMENT_POSITION_PRECEDING);
    assert.equal(c.compareDocumentPosition(c), 0);

    // WebKit uses DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC.
    assert.notEqual(document.compareDocumentPosition(div) &
        DOCUMENT_POSITION_DISCONNECTED, 0)
  });

  test('ownerDocument with template and shadow root', function() {
    var div = document.createElement('div');
    div.innerHTML = '<template><span></span></template>';

    var content1 = div.firstChild.content;
    var host = content1.firstChild;

    div.innerHTML = '<template>hello world</template>';
    var content2 = div.firstChild.content;
    var x = content2.firstChild;

    var sr = host.createShadowRoot();
    sr.appendChild(content2);

    assert.equal(x.parentNode, sr);
    assert.equal(x.ownerDocument, sr.ownerDocument);
    assert.equal(sr.ownerDocument, host.ownerDocument);

    var doc = wrap(document);
    doc.body.appendChild(host);
    assert.equal(host.ownerDocument, doc);
    assert.equal(sr.ownerDocument, doc);
    assert.equal(x.ownerDocument, doc);

    doc.body.removeChild(host);
  });

  test('ownerDocument when appending to document', function() {
    var doc1 = document.implementation.createHTMLDocument('');
    var comment = doc1.createComment('');
    doc1.appendChild(comment);
    assert.equal(doc1, comment.ownerDocument);

    var doc2 = document.implementation.createHTMLDocument('');
    doc2.appendChild(comment);
    assert.equal(doc2, comment.ownerDocument);
  });

  test('removeChild resets pointers', function() {
    var host = document.createElement('div');
    host.innerHTML = '<a></a>';
    var a = host.firstChild;
    var sr = host.createShadowRoot();

    host.offsetHeight;

    host.removeChild(a);

    expectStructure(a, {});

    var div = document.createElement('div');
    div.appendChild(a);

    expectStructure(div, {
      firstChild: a,
      lastChild: a
    });

    expectStructure(a, {
      parentNode: div
    });
  });

  test('replaceChild resets pointers', function() {
    var host = document.createElement('div');
    host.innerHTML = '<a></a>';
    var a = host.firstChild;
    var sr = host.createShadowRoot();

    host.offsetHeight;

    var b = document.createElement('b');

    host.replaceChild(b, a);

    expectStructure(a, {});

    expectStructure(b, {
      parentNode: host
    });

    var div = document.createElement('div');
    div.appendChild(a);

    expectStructure(div, {
      firstChild: a,
      lastChild: a
    });

    expectStructure(a, {
      parentNode: div
    });
  });

  test('appendChild resets pointers', function() {
    var host1 = document.createElement('div');
    host1.innerHTML = '<a></a>';
    var a = host1.firstChild;
    var sr1 = host1.createShadowRoot();

    var host2 = document.createElement('div');
    host2.innerHTML = '<b></b>';
    var b = host2.firstChild;
    var sr2 = host2.createShadowRoot();

    host1.offsetHeight;
    host2.offsetHeight;

    host1.appendChild(b);

    expectStructure(host1, {
      firstChild: a,
      lastChild: b
    });

    expectStructure(a, {
      parentNode: host1,
      nextSibling: b
    });

    expectStructure(b, {
      parentNode: host1,
      previousSibling: a
    });

    expectStructure(host2, {});
  });

  test('hasChildNodes without a shadow root', function() {
    var div = document.createElement('div');

    assert.isFalse(div.hasChildNodes(), 'should be false with no children');

    div.innerHTML = '<span></span>';
    assert.isTrue(div.hasChildNodes(), 'should be true with a single child');

    div.innerHTML = '<span></span><ul></ul>';
    assert.isTrue(div.hasChildNodes(), 'should be true with multiple children');
  });

  test('parentElement', function() {
    var a = document.createElement('a');
    a.textContent = 'text';
    var textNode = a.firstChild;
    assert.equal(textNode.parentElement, a);
    assert.isNull(a.parentElement);

    var doc = wrap(document);
    var body = doc.body;
    var documentElement = doc.documentElement;
    assert.equal(body.parentElement, documentElement);
    assert.isNull(documentElement.parentElement);
  });

  test('contains', function() {
    var div = document.createElement('div');
    assert.isTrue(div.contains(div));

    div.textContent = 'a';
    var textNode = div.firstChild;
    assert.isTrue(textNode.contains(textNode));
    assert.isTrue(div.contains(textNode));
    assert.isFalse(textNode.contains(div));

    var doc = div.ownerDocument;
    assert.isTrue(doc.contains(doc));
    assert.isFalse(doc.contains(div));
    assert.isFalse(doc.contains(textNode));

    assert.isFalse(div.contains(null));
    assert.isFalse(div.contains());
  });

  test('instanceof', function() {
    var div = document.createElement('div');
    assert.instanceOf(div, HTMLElement);
    assert.instanceOf(div, Element);
    assert.instanceOf(div, EventTarget);
  });

  test('cloneNode(false)', function() {
    var doc = wrap(document);
    var a = document.createElement('a');
    a.href = 'http://domain.com/';
    a.textContent = 'text';
    var textNode = a.firstChild;

    var aClone = a.cloneNode(false);

    assert.equal(aClone.tagName, 'A');
    assert.equal(aClone.href, 'http://domain.com/');
    expectStructure(aClone, {});
  });

  test('cloneNode(true)', function() {
    var doc = wrap(document);
    var a = document.createElement('a');
    a.href = 'http://domain.com/';
    a.textContent = 'text';
    var textNode = a.firstChild;

    var aClone = a.cloneNode(true);
    var textNodeClone = aClone.firstChild;

    assert.equal(aClone.tagName, 'A');
    assert.equal(aClone.href, 'http://domain.com/');
    expectStructure(aClone, {
      firstChild: textNodeClone,
      lastChild: textNodeClone
    });
    expectStructure(textNodeClone, {
      parentNode: aClone
    });
  });

  test('cloneNode with shadowRoot', function() {
    var div = document.createElement('div');
    var a = div.appendChild(document.createElement('a'));
    var sr = a.createShadowRoot();
    sr.innerHTML = '<b></b>';
    div.offsetHeight;
    assert.equal(unwrap(div).innerHTML, '<a><b></b></a>');

    var clone = div.cloneNode(true);
    assert.equal(clone.innerHTML, '<a></a>');
    clone.offsetHeight;
    // shadow roots are not cloned.
    assert.equal(unwrap(clone).innerHTML, '<a></a>');
  });

});
