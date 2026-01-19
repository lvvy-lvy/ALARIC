/******/ "use strict";
/******/ var __webpack_modules__ = ({

/***/ 201:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Doc: () => (/* binding */ Doc)
/* harmony export */ });
class Doc {
    constructor(args = []) {
        this.content = [];
        this.indent = 0;
        if (this)
            this.args = args;
    }
    indented(fn) {
        this.indent += 1;
        fn(this);
        this.indent -= 1;
    }
    write(arg) {
        if (typeof arg === "function") {
            arg(this, { execution: "sync" });
            arg(this, { execution: "async" });
            return;
        }
        const content = arg;
        const lines = content.split("\n").filter((x) => x);
        const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
        const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
        for (const line of dedented) {
            this.content.push(line);
        }
    }
    compile() {
        const F = Function;
        const args = this?.args;
        const content = this?.content ?? [``];
        const lines = [...content.map((x) => `  ${x}`)];
        // console.log(lines.join("\n"));
        return new F(...args, lines.join("\n"));
    }
}


/***/ }),

/***/ 207:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "znaków", verb: "mieć" },
        file: { unit: "bajtów", verb: "mieć" },
        array: { unit: "elementów", verb: "mieć" },
        set: { unit: "elementów", verb: "mieć" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "liczba";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "tablica";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "wyrażenie",
        email: "adres email",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "data i godzina w formacie ISO",
        date: "data w formacie ISO",
        time: "godzina w formacie ISO",
        duration: "czas trwania ISO",
        ipv4: "adres IPv4",
        ipv6: "adres IPv6",
        cidrv4: "zakres IPv4",
        cidrv6: "zakres IPv6",
        base64: "ciąg znaków zakodowany w formacie base64",
        base64url: "ciąg znaków zakodowany w formacie base64url",
        json_string: "ciąg znaków w formacie JSON",
        e164: "liczba E.164",
        jwt: "JWT",
        template_literal: "wejście",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Nieprawidłowe dane wejściowe: oczekiwano ${issue.expected}, otrzymano ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Nieprawidłowe dane wejściowe: oczekiwano ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Nieprawidłowa opcja: oczekiwano jednej z wartości ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Za duża wartość: oczekiwano, że ${issue.origin ?? "wartość"} będzie mieć ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementów"}`;
                }
                return `Zbyt duż(y/a/e): oczekiwano, że ${issue.origin ?? "wartość"} będzie wynosić ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Za mała wartość: oczekiwano, że ${issue.origin ?? "wartość"} będzie mieć ${adj}${issue.minimum.toString()} ${sizing.unit ?? "elementów"}`;
                }
                return `Zbyt mał(y/a/e): oczekiwano, że ${issue.origin ?? "wartość"} będzie wynosić ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `Nieprawidłowy ciąg znaków: musi zaczynać się od "${_issue.prefix}"`;
                if (_issue.format === "ends_with")
                    return `Nieprawidłowy ciąg znaków: musi kończyć się na "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Nieprawidłowy ciąg znaków: musi zawierać "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Nieprawidłowy ciąg znaków: musi odpowiadać wzorcowi ${_issue.pattern}`;
                return `Nieprawidłow(y/a/e) ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Nieprawidłowa liczba: musi być wielokrotnością ${issue.divisor}`;
            case "unrecognized_keys":
                return `Nierozpoznane klucze${issue.keys.length > 1 ? "s" : ""}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Nieprawidłowy klucz w ${issue.origin}`;
            case "invalid_union":
                return "Nieprawidłowe dane wejściowe";
            case "invalid_element":
                return `Nieprawidłowa wartość w ${issue.origin}`;
            default:
                return `Nieprawidłowe dane wejściowe`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 273:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "문자", verb: "to have" },
        file: { unit: "바이트", verb: "to have" },
        array: { unit: "개", verb: "to have" },
        set: { unit: "개", verb: "to have" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "number";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "array";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "입력",
        email: "이메일 주소",
        url: "URL",
        emoji: "이모지",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO 날짜시간",
        date: "ISO 날짜",
        time: "ISO 시간",
        duration: "ISO 기간",
        ipv4: "IPv4 주소",
        ipv6: "IPv6 주소",
        cidrv4: "IPv4 범위",
        cidrv6: "IPv6 범위",
        base64: "base64 인코딩 문자열",
        base64url: "base64url 인코딩 문자열",
        json_string: "JSON 문자열",
        e164: "E.164 번호",
        jwt: "JWT",
        template_literal: "입력",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `잘못된 입력: 예상 타입은 ${issue.expected}, 받은 타입은 ${parsedType(issue.input)}입니다`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `잘못된 입력: 값은 ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])} 이어야 합니다`;
                return `잘못된 옵션: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "또는 ")} 중 하나여야 합니다`;
            case "too_big": {
                const adj = issue.inclusive ? "이하" : "미만";
                const suffix = adj === "미만" ? "이어야 합니다" : "여야 합니다";
                const sizing = getSizing(issue.origin);
                const unit = sizing?.unit ?? "요소";
                if (sizing)
                    return `${issue.origin ?? "값"}이 너무 큽니다: ${issue.maximum.toString()}${unit} ${adj}${suffix}`;
                return `${issue.origin ?? "값"}이 너무 큽니다: ${issue.maximum.toString()} ${adj}${suffix}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? "이상" : "초과";
                const suffix = adj === "이상" ? "이어야 합니다" : "여야 합니다";
                const sizing = getSizing(issue.origin);
                const unit = sizing?.unit ?? "요소";
                if (sizing) {
                    return `${issue.origin ?? "값"}이 너무 작습니다: ${issue.minimum.toString()}${unit} ${adj}${suffix}`;
                }
                return `${issue.origin ?? "값"}이 너무 작습니다: ${issue.minimum.toString()} ${adj}${suffix}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with") {
                    return `잘못된 문자열: "${_issue.prefix}"(으)로 시작해야 합니다`;
                }
                if (_issue.format === "ends_with")
                    return `잘못된 문자열: "${_issue.suffix}"(으)로 끝나야 합니다`;
                if (_issue.format === "includes")
                    return `잘못된 문자열: "${_issue.includes}"을(를) 포함해야 합니다`;
                if (_issue.format === "regex")
                    return `잘못된 문자열: 정규식 ${_issue.pattern} 패턴과 일치해야 합니다`;
                return `잘못된 ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `잘못된 숫자: ${issue.divisor}의 배수여야 합니다`;
            case "unrecognized_keys":
                return `인식할 수 없는 키: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `잘못된 키: ${issue.origin}`;
            case "invalid_union":
                return `잘못된 입력`;
            case "invalid_element":
                return `잘못된 값: ${issue.origin}`;
            default:
                return `잘못된 입력`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 370:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "文字", verb: "である" },
        file: { unit: "バイト", verb: "である" },
        array: { unit: "要素", verb: "である" },
        set: { unit: "要素", verb: "である" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "数値";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "配列";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "入力値",
        email: "メールアドレス",
        url: "URL",
        emoji: "絵文字",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO日時",
        date: "ISO日付",
        time: "ISO時刻",
        duration: "ISO期間",
        ipv4: "IPv4アドレス",
        ipv6: "IPv6アドレス",
        cidrv4: "IPv4範囲",
        cidrv6: "IPv6範囲",
        base64: "base64エンコード文字列",
        base64url: "base64urlエンコード文字列",
        json_string: "JSON文字列",
        e164: "E.164番号",
        jwt: "JWT",
        template_literal: "入力値",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `無効な入力: ${issue.expected}が期待されましたが、${parsedType(issue.input)}が入力されました`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `無効な入力: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}が期待されました`;
                return `無効な選択: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "、")}のいずれかである必要があります`;
            case "too_big": {
                const adj = issue.inclusive ? "以下である" : "より小さい";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `大きすぎる値: ${issue.origin ?? "値"}は${issue.maximum.toString()}${sizing.unit ?? "要素"}${adj}必要があります`;
                return `大きすぎる値: ${issue.origin ?? "値"}は${issue.maximum.toString()}${adj}必要があります`;
            }
            case "too_small": {
                const adj = issue.inclusive ? "以上である" : "より大きい";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `小さすぎる値: ${issue.origin}は${issue.minimum.toString()}${sizing.unit}${adj}必要があります`;
                return `小さすぎる値: ${issue.origin}は${issue.minimum.toString()}${adj}必要があります`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `無効な文字列: "${_issue.prefix}"で始まる必要があります`;
                if (_issue.format === "ends_with")
                    return `無効な文字列: "${_issue.suffix}"で終わる必要があります`;
                if (_issue.format === "includes")
                    return `無効な文字列: "${_issue.includes}"を含む必要があります`;
                if (_issue.format === "regex")
                    return `無効な文字列: パターン${_issue.pattern}に一致する必要があります`;
                return `無効な${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `無効な数値: ${issue.divisor}の倍数である必要があります`;
            case "unrecognized_keys":
                return `認識されていないキー${issue.keys.length > 1 ? "群" : ""}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, "、")}`;
            case "invalid_key":
                return `${issue.origin}内の無効なキー`;
            case "invalid_union":
                return "無効な入力";
            case "invalid_element":
                return `${issue.origin}内の無効な値`;
            default:
                return `無効な入力`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 372:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "Zeichen", verb: "zu haben" },
        file: { unit: "Bytes", verb: "zu haben" },
        array: { unit: "Elemente", verb: "zu haben" },
        set: { unit: "Elemente", verb: "zu haben" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "Zahl";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "Array";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "Eingabe",
        email: "E-Mail-Adresse",
        url: "URL",
        emoji: "Emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO-Datum und -Uhrzeit",
        date: "ISO-Datum",
        time: "ISO-Uhrzeit",
        duration: "ISO-Dauer",
        ipv4: "IPv4-Adresse",
        ipv6: "IPv6-Adresse",
        cidrv4: "IPv4-Bereich",
        cidrv6: "IPv6-Bereich",
        base64: "Base64-codierter String",
        base64url: "Base64-URL-codierter String",
        json_string: "JSON-String",
        e164: "E.164-Nummer",
        jwt: "JWT",
        template_literal: "Eingabe",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Ungültige Eingabe: erwartet ${issue.expected}, erhalten ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Ungültige Eingabe: erwartet ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Ungültige Option: erwartet eine von ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Zu groß: erwartet, dass ${issue.origin ?? "Wert"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "Elemente"} hat`;
                return `Zu groß: erwartet, dass ${issue.origin ?? "Wert"} ${adj}${issue.maximum.toString()} ist`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Zu klein: erwartet, dass ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} hat`;
                }
                return `Zu klein: erwartet, dass ${issue.origin} ${adj}${issue.minimum.toString()} ist`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `Ungültiger String: muss mit "${_issue.prefix}" beginnen`;
                if (_issue.format === "ends_with")
                    return `Ungültiger String: muss mit "${_issue.suffix}" enden`;
                if (_issue.format === "includes")
                    return `Ungültiger String: muss "${_issue.includes}" enthalten`;
                if (_issue.format === "regex")
                    return `Ungültiger String: muss dem Muster ${_issue.pattern} entsprechen`;
                return `Ungültig: ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Ungültige Zahl: muss ein Vielfaches von ${issue.divisor} sein`;
            case "unrecognized_keys":
                return `${issue.keys.length > 1 ? "Unbekannte Schlüssel" : "Unbekannter Schlüssel"}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Ungültiger Schlüssel in ${issue.origin}`;
            case "invalid_union":
                return "Ungültige Eingabe";
            case "invalid_element":
                return `Ungültiger Wert in ${issue.origin}`;
            default:
                return `Ungültige Eingabe`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 450:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "tecken", verb: "att ha" },
        file: { unit: "bytes", verb: "att ha" },
        array: { unit: "objekt", verb: "att innehålla" },
        set: { unit: "objekt", verb: "att innehålla" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "antal";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "lista";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "reguljärt uttryck",
        email: "e-postadress",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO-datum och tid",
        date: "ISO-datum",
        time: "ISO-tid",
        duration: "ISO-varaktighet",
        ipv4: "IPv4-intervall",
        ipv6: "IPv6-intervall",
        cidrv4: "IPv4-spektrum",
        cidrv6: "IPv6-spektrum",
        base64: "base64-kodad sträng",
        base64url: "base64url-kodad sträng",
        json_string: "JSON-sträng",
        e164: "E.164-nummer",
        jwt: "JWT",
        template_literal: "mall-literal",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Ogiltig inmatning: förväntat ${issue.expected}, fick ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Ogiltig inmatning: förväntat ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Ogiltigt val: förväntade en av ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `För stor(t): förväntade ${issue.origin ?? "värdet"} att ha ${adj}${issue.maximum.toString()} ${sizing.unit ?? "element"}`;
                }
                return `För stor(t): förväntat ${issue.origin ?? "värdet"} att ha ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `För lite(t): förväntade ${issue.origin ?? "värdet"} att ha ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `För lite(t): förväntade ${issue.origin ?? "värdet"} att ha ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with") {
                    return `Ogiltig sträng: måste börja med "${_issue.prefix}"`;
                }
                if (_issue.format === "ends_with")
                    return `Ogiltig sträng: måste sluta med "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Ogiltig sträng: måste innehålla "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Ogiltig sträng: måste matcha mönstret "${_issue.pattern}"`;
                return `Ogiltig(t) ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Ogiltigt tal: måste vara en multipel av ${issue.divisor}`;
            case "unrecognized_keys":
                return `${issue.keys.length > 1 ? "Okända nycklar" : "Okänd nyckel"}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Ogiltig nyckel i ${issue.origin ?? "värdet"}`;
            case "invalid_union":
                return "Ogiltig input";
            case "invalid_element":
                return `Ogiltigt värde i ${issue.origin ?? "värdet"}`;
            default:
                return `Ogiltig input`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 463:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TimePrecision: () => (/* binding */ TimePrecision),
/* harmony export */   _any: () => (/* binding */ _any),
/* harmony export */   _array: () => (/* binding */ _array),
/* harmony export */   _base64: () => (/* binding */ _base64),
/* harmony export */   _base64url: () => (/* binding */ _base64url),
/* harmony export */   _bigint: () => (/* binding */ _bigint),
/* harmony export */   _boolean: () => (/* binding */ _boolean),
/* harmony export */   _catch: () => (/* binding */ _catch),
/* harmony export */   _check: () => (/* binding */ _check),
/* harmony export */   _cidrv4: () => (/* binding */ _cidrv4),
/* harmony export */   _cidrv6: () => (/* binding */ _cidrv6),
/* harmony export */   _coercedBigint: () => (/* binding */ _coercedBigint),
/* harmony export */   _coercedBoolean: () => (/* binding */ _coercedBoolean),
/* harmony export */   _coercedDate: () => (/* binding */ _coercedDate),
/* harmony export */   _coercedNumber: () => (/* binding */ _coercedNumber),
/* harmony export */   _coercedString: () => (/* binding */ _coercedString),
/* harmony export */   _cuid: () => (/* binding */ _cuid),
/* harmony export */   _cuid2: () => (/* binding */ _cuid2),
/* harmony export */   _custom: () => (/* binding */ _custom),
/* harmony export */   _date: () => (/* binding */ _date),
/* harmony export */   _default: () => (/* binding */ _default),
/* harmony export */   _discriminatedUnion: () => (/* binding */ _discriminatedUnion),
/* harmony export */   _e164: () => (/* binding */ _e164),
/* harmony export */   _email: () => (/* binding */ _email),
/* harmony export */   _emoji: () => (/* binding */ _emoji),
/* harmony export */   _endsWith: () => (/* binding */ _endsWith),
/* harmony export */   _enum: () => (/* binding */ _enum),
/* harmony export */   _file: () => (/* binding */ _file),
/* harmony export */   _float32: () => (/* binding */ _float32),
/* harmony export */   _float64: () => (/* binding */ _float64),
/* harmony export */   _gt: () => (/* binding */ _gt),
/* harmony export */   _gte: () => (/* binding */ _gte),
/* harmony export */   _guid: () => (/* binding */ _guid),
/* harmony export */   _includes: () => (/* binding */ _includes),
/* harmony export */   _int: () => (/* binding */ _int),
/* harmony export */   _int32: () => (/* binding */ _int32),
/* harmony export */   _int64: () => (/* binding */ _int64),
/* harmony export */   _intersection: () => (/* binding */ _intersection),
/* harmony export */   _ipv4: () => (/* binding */ _ipv4),
/* harmony export */   _ipv6: () => (/* binding */ _ipv6),
/* harmony export */   _isoDate: () => (/* binding */ _isoDate),
/* harmony export */   _isoDateTime: () => (/* binding */ _isoDateTime),
/* harmony export */   _isoDuration: () => (/* binding */ _isoDuration),
/* harmony export */   _isoTime: () => (/* binding */ _isoTime),
/* harmony export */   _jwt: () => (/* binding */ _jwt),
/* harmony export */   _ksuid: () => (/* binding */ _ksuid),
/* harmony export */   _lazy: () => (/* binding */ _lazy),
/* harmony export */   _length: () => (/* binding */ _length),
/* harmony export */   _literal: () => (/* binding */ _literal),
/* harmony export */   _lowercase: () => (/* binding */ _lowercase),
/* harmony export */   _lt: () => (/* binding */ _lt),
/* harmony export */   _lte: () => (/* binding */ _lte),
/* harmony export */   _map: () => (/* binding */ _map),
/* harmony export */   _max: () => (/* binding */ _lte),
/* harmony export */   _maxLength: () => (/* binding */ _maxLength),
/* harmony export */   _maxSize: () => (/* binding */ _maxSize),
/* harmony export */   _mime: () => (/* binding */ _mime),
/* harmony export */   _min: () => (/* binding */ _gte),
/* harmony export */   _minLength: () => (/* binding */ _minLength),
/* harmony export */   _minSize: () => (/* binding */ _minSize),
/* harmony export */   _multipleOf: () => (/* binding */ _multipleOf),
/* harmony export */   _nan: () => (/* binding */ _nan),
/* harmony export */   _nanoid: () => (/* binding */ _nanoid),
/* harmony export */   _nativeEnum: () => (/* binding */ _nativeEnum),
/* harmony export */   _negative: () => (/* binding */ _negative),
/* harmony export */   _never: () => (/* binding */ _never),
/* harmony export */   _nonnegative: () => (/* binding */ _nonnegative),
/* harmony export */   _nonoptional: () => (/* binding */ _nonoptional),
/* harmony export */   _nonpositive: () => (/* binding */ _nonpositive),
/* harmony export */   _normalize: () => (/* binding */ _normalize),
/* harmony export */   _null: () => (/* binding */ _null),
/* harmony export */   _nullable: () => (/* binding */ _nullable),
/* harmony export */   _number: () => (/* binding */ _number),
/* harmony export */   _optional: () => (/* binding */ _optional),
/* harmony export */   _overwrite: () => (/* binding */ _overwrite),
/* harmony export */   _pipe: () => (/* binding */ _pipe),
/* harmony export */   _positive: () => (/* binding */ _positive),
/* harmony export */   _promise: () => (/* binding */ _promise),
/* harmony export */   _property: () => (/* binding */ _property),
/* harmony export */   _readonly: () => (/* binding */ _readonly),
/* harmony export */   _record: () => (/* binding */ _record),
/* harmony export */   _refine: () => (/* binding */ _refine),
/* harmony export */   _regex: () => (/* binding */ _regex),
/* harmony export */   _set: () => (/* binding */ _set),
/* harmony export */   _size: () => (/* binding */ _size),
/* harmony export */   _startsWith: () => (/* binding */ _startsWith),
/* harmony export */   _string: () => (/* binding */ _string),
/* harmony export */   _stringFormat: () => (/* binding */ _stringFormat),
/* harmony export */   _stringbool: () => (/* binding */ _stringbool),
/* harmony export */   _success: () => (/* binding */ _success),
/* harmony export */   _superRefine: () => (/* binding */ _superRefine),
/* harmony export */   _symbol: () => (/* binding */ _symbol),
/* harmony export */   _templateLiteral: () => (/* binding */ _templateLiteral),
/* harmony export */   _toLowerCase: () => (/* binding */ _toLowerCase),
/* harmony export */   _toUpperCase: () => (/* binding */ _toUpperCase),
/* harmony export */   _transform: () => (/* binding */ _transform),
/* harmony export */   _trim: () => (/* binding */ _trim),
/* harmony export */   _tuple: () => (/* binding */ _tuple),
/* harmony export */   _uint32: () => (/* binding */ _uint32),
/* harmony export */   _uint64: () => (/* binding */ _uint64),
/* harmony export */   _ulid: () => (/* binding */ _ulid),
/* harmony export */   _undefined: () => (/* binding */ _undefined),
/* harmony export */   _union: () => (/* binding */ _union),
/* harmony export */   _unknown: () => (/* binding */ _unknown),
/* harmony export */   _uppercase: () => (/* binding */ _uppercase),
/* harmony export */   _url: () => (/* binding */ _url),
/* harmony export */   _uuid: () => (/* binding */ _uuid),
/* harmony export */   _uuidv4: () => (/* binding */ _uuidv4),
/* harmony export */   _uuidv6: () => (/* binding */ _uuidv6),
/* harmony export */   _uuidv7: () => (/* binding */ _uuidv7),
/* harmony export */   _void: () => (/* binding */ _void),
/* harmony export */   _xid: () => (/* binding */ _xid)
/* harmony export */ });
/* harmony import */ var _checks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8250);
/* harmony import */ var _schemas_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2151);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4995);



function _string(Class, params) {
    return new Class({
        type: "string",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _coercedString(Class, params) {
    return new Class({
        type: "string",
        coerce: true,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _email(Class, params) {
    return new Class({
        type: "string",
        format: "email",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _guid(Class, params) {
    return new Class({
        type: "string",
        format: "guid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _uuid(Class, params) {
    return new Class({
        type: "string",
        format: "uuid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _uuidv4(Class, params) {
    return new Class({
        type: "string",
        format: "uuid",
        check: "string_format",
        abort: false,
        version: "v4",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _uuidv6(Class, params) {
    return new Class({
        type: "string",
        format: "uuid",
        check: "string_format",
        abort: false,
        version: "v6",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _uuidv7(Class, params) {
    return new Class({
        type: "string",
        format: "uuid",
        check: "string_format",
        abort: false,
        version: "v7",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _url(Class, params) {
    return new Class({
        type: "string",
        format: "url",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _emoji(Class, params) {
    return new Class({
        type: "string",
        format: "emoji",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _nanoid(Class, params) {
    return new Class({
        type: "string",
        format: "nanoid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _cuid(Class, params) {
    return new Class({
        type: "string",
        format: "cuid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _cuid2(Class, params) {
    return new Class({
        type: "string",
        format: "cuid2",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _ulid(Class, params) {
    return new Class({
        type: "string",
        format: "ulid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _xid(Class, params) {
    return new Class({
        type: "string",
        format: "xid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _ksuid(Class, params) {
    return new Class({
        type: "string",
        format: "ksuid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _ipv4(Class, params) {
    return new Class({
        type: "string",
        format: "ipv4",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _ipv6(Class, params) {
    return new Class({
        type: "string",
        format: "ipv6",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _cidrv4(Class, params) {
    return new Class({
        type: "string",
        format: "cidrv4",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _cidrv6(Class, params) {
    return new Class({
        type: "string",
        format: "cidrv6",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _base64(Class, params) {
    return new Class({
        type: "string",
        format: "base64",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _base64url(Class, params) {
    return new Class({
        type: "string",
        format: "base64url",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _e164(Class, params) {
    return new Class({
        type: "string",
        format: "e164",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _jwt(Class, params) {
    return new Class({
        type: "string",
        format: "jwt",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
const TimePrecision = {
    Any: null,
    Minute: -1,
    Second: 0,
    Millisecond: 3,
    Microsecond: 6,
};
function _isoDateTime(Class, params) {
    return new Class({
        type: "string",
        format: "datetime",
        check: "string_format",
        offset: false,
        local: false,
        precision: null,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _isoDate(Class, params) {
    return new Class({
        type: "string",
        format: "date",
        check: "string_format",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _isoTime(Class, params) {
    return new Class({
        type: "string",
        format: "time",
        check: "string_format",
        precision: null,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _isoDuration(Class, params) {
    return new Class({
        type: "string",
        format: "duration",
        check: "string_format",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _number(Class, params) {
    return new Class({
        type: "number",
        checks: [],
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _coercedNumber(Class, params) {
    return new Class({
        type: "number",
        coerce: true,
        checks: [],
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _int(Class, params) {
    return new Class({
        type: "number",
        check: "number_format",
        abort: false,
        format: "safeint",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _float32(Class, params) {
    return new Class({
        type: "number",
        check: "number_format",
        abort: false,
        format: "float32",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _float64(Class, params) {
    return new Class({
        type: "number",
        check: "number_format",
        abort: false,
        format: "float64",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _int32(Class, params) {
    return new Class({
        type: "number",
        check: "number_format",
        abort: false,
        format: "int32",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _uint32(Class, params) {
    return new Class({
        type: "number",
        check: "number_format",
        abort: false,
        format: "uint32",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _boolean(Class, params) {
    return new Class({
        type: "boolean",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _coercedBoolean(Class, params) {
    return new Class({
        type: "boolean",
        coerce: true,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _bigint(Class, params) {
    return new Class({
        type: "bigint",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _coercedBigint(Class, params) {
    return new Class({
        type: "bigint",
        coerce: true,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _int64(Class, params) {
    return new Class({
        type: "bigint",
        check: "bigint_format",
        abort: false,
        format: "int64",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _uint64(Class, params) {
    return new Class({
        type: "bigint",
        check: "bigint_format",
        abort: false,
        format: "uint64",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _symbol(Class, params) {
    return new Class({
        type: "symbol",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _undefined(Class, params) {
    return new Class({
        type: "undefined",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _null(Class, params) {
    return new Class({
        type: "null",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _any(Class) {
    return new Class({
        type: "any",
    });
}
function _unknown(Class) {
    return new Class({
        type: "unknown",
    });
}
function _never(Class, params) {
    return new Class({
        type: "never",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _void(Class, params) {
    return new Class({
        type: "void",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _date(Class, params) {
    return new Class({
        type: "date",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _coercedDate(Class, params) {
    return new Class({
        type: "date",
        coerce: true,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _nan(Class, params) {
    return new Class({
        type: "nan",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _lt(value, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckLessThan({
        check: "less_than",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        value,
        inclusive: false,
    });
}
function _lte(value, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckLessThan({
        check: "less_than",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        value,
        inclusive: true,
    });
}

function _gt(value, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckGreaterThan({
        check: "greater_than",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        value,
        inclusive: false,
    });
}
function _gte(value, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckGreaterThan({
        check: "greater_than",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        value,
        inclusive: true,
    });
}

function _positive(params) {
    return _gt(0, params);
}
// negative
function _negative(params) {
    return _lt(0, params);
}
// nonpositive
function _nonpositive(params) {
    return _lte(0, params);
}
// nonnegative
function _nonnegative(params) {
    return _gte(0, params);
}
function _multipleOf(value, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckMultipleOf({
        check: "multiple_of",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        value,
    });
}
function _maxSize(maximum, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckMaxSize({
        check: "max_size",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        maximum,
    });
}
function _minSize(minimum, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckMinSize({
        check: "min_size",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        minimum,
    });
}
function _size(size, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckSizeEquals({
        check: "size_equals",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        size,
    });
}
function _maxLength(maximum, params) {
    const ch = new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckMaxLength({
        check: "max_length",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        maximum,
    });
    return ch;
}
function _minLength(minimum, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckMinLength({
        check: "min_length",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        minimum,
    });
}
function _length(length, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckLengthEquals({
        check: "length_equals",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        length,
    });
}
function _regex(pattern, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckRegex({
        check: "string_format",
        format: "regex",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        pattern,
    });
}
function _lowercase(params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckLowerCase({
        check: "string_format",
        format: "lowercase",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _uppercase(params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckUpperCase({
        check: "string_format",
        format: "uppercase",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _includes(includes, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckIncludes({
        check: "string_format",
        format: "includes",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        includes,
    });
}
function _startsWith(prefix, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckStartsWith({
        check: "string_format",
        format: "starts_with",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        prefix,
    });
}
function _endsWith(suffix, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckEndsWith({
        check: "string_format",
        format: "ends_with",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        suffix,
    });
}
function _property(property, schema, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckProperty({
        check: "property",
        property,
        schema,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _mime(types, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckMimeType({
        check: "mime_type",
        mime: types,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _overwrite(tx) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckOverwrite({
        check: "overwrite",
        tx,
    });
}
// normalize
function _normalize(form) {
    return _overwrite((input) => input.normalize(form));
}
// trim
function _trim() {
    return _overwrite((input) => input.trim());
}
// toLowerCase
function _toLowerCase() {
    return _overwrite((input) => input.toLowerCase());
}
// toUpperCase
function _toUpperCase() {
    return _overwrite((input) => input.toUpperCase());
}
function _array(Class, element, params) {
    return new Class({
        type: "array",
        element,
        // get element() {
        //   return element;
        // },
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _union(Class, options, params) {
    return new Class({
        type: "union",
        options,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _discriminatedUnion(Class, discriminator, options, params) {
    return new Class({
        type: "union",
        options,
        discriminator,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _intersection(Class, left, right) {
    return new Class({
        type: "intersection",
        left,
        right,
    });
}
// export function _tuple(
//   Class: util.SchemaClass<schemas.$ZodTuple>,
//   items: [],
//   params?: string | $ZodTupleParams
// ): schemas.$ZodTuple<[], null>;
function _tuple(Class, items, _paramsOrRest, _params) {
    const hasRest = _paramsOrRest instanceof _schemas_js__WEBPACK_IMPORTED_MODULE_1__.$ZodType;
    const params = hasRest ? _params : _paramsOrRest;
    const rest = hasRest ? _paramsOrRest : null;
    return new Class({
        type: "tuple",
        items,
        rest,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _record(Class, keyType, valueType, params) {
    return new Class({
        type: "record",
        keyType,
        valueType,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _map(Class, keyType, valueType, params) {
    return new Class({
        type: "map",
        keyType,
        valueType,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _set(Class, valueType, params) {
    return new Class({
        type: "set",
        valueType,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _enum(Class, values, params) {
    const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
    // if (Array.isArray(values)) {
    //   for (const value of values) {
    //     entries[value] = value;
    //   }
    // } else {
    //   Object.assign(entries, values);
    // }
    // const entries: util.EnumLike = {};
    // for (const val of values) {
    //   entries[val] = val;
    // }
    return new Class({
        type: "enum",
        entries,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
/** @deprecated This API has been merged into `z.enum()`. Use `z.enum()` instead.
 *
 * ```ts
 * enum Colors { red, green, blue }
 * z.enum(Colors);
 * ```
 */
function _nativeEnum(Class, entries, params) {
    return new Class({
        type: "enum",
        entries,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _literal(Class, value, params) {
    return new Class({
        type: "literal",
        values: Array.isArray(value) ? value : [value],
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _file(Class, params) {
    return new Class({
        type: "file",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _transform(Class, fn) {
    return new Class({
        type: "transform",
        transform: fn,
    });
}
function _optional(Class, innerType) {
    return new Class({
        type: "optional",
        innerType,
    });
}
function _nullable(Class, innerType) {
    return new Class({
        type: "nullable",
        innerType,
    });
}
function _default(Class, innerType, defaultValue) {
    return new Class({
        type: "default",
        innerType,
        get defaultValue() {
            return typeof defaultValue === "function" ? defaultValue() : _util_js__WEBPACK_IMPORTED_MODULE_2__.shallowClone(defaultValue);
        },
    });
}
function _nonoptional(Class, innerType, params) {
    return new Class({
        type: "nonoptional",
        innerType,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _success(Class, innerType) {
    return new Class({
        type: "success",
        innerType,
    });
}
function _catch(Class, innerType, catchValue) {
    return new Class({
        type: "catch",
        innerType,
        catchValue: (typeof catchValue === "function" ? catchValue : () => catchValue),
    });
}
function _pipe(Class, in_, out) {
    return new Class({
        type: "pipe",
        in: in_,
        out,
    });
}
function _readonly(Class, innerType) {
    return new Class({
        type: "readonly",
        innerType,
    });
}
function _templateLiteral(Class, parts, params) {
    return new Class({
        type: "template_literal",
        parts,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _lazy(Class, getter) {
    return new Class({
        type: "lazy",
        getter,
    });
}
function _promise(Class, innerType) {
    return new Class({
        type: "promise",
        innerType,
    });
}
function _custom(Class, fn, _params) {
    const norm = _util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(_params);
    norm.abort ?? (norm.abort = true); // default to abort:false
    const schema = new Class({
        type: "custom",
        check: "custom",
        fn: fn,
        ...norm,
    });
    return schema;
}
// same as _custom but defaults to abort:false
function _refine(Class, fn, _params) {
    const schema = new Class({
        type: "custom",
        check: "custom",
        fn: fn,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(_params),
    });
    return schema;
}
function _superRefine(fn) {
    const ch = _check((payload) => {
        payload.addIssue = (issue) => {
            if (typeof issue === "string") {
                payload.issues.push(_util_js__WEBPACK_IMPORTED_MODULE_2__.issue(issue, payload.value, ch._zod.def));
            }
            else {
                // for Zod 3 backwards compatibility
                const _issue = issue;
                if (_issue.fatal)
                    _issue.continue = false;
                _issue.code ?? (_issue.code = "custom");
                _issue.input ?? (_issue.input = payload.value);
                _issue.inst ?? (_issue.inst = ch);
                _issue.continue ?? (_issue.continue = !ch._zod.def.abort); // abort is always undefined, so this is always true...
                payload.issues.push(_util_js__WEBPACK_IMPORTED_MODULE_2__.issue(_issue));
            }
        };
        return fn(payload.value, payload);
    });
    return ch;
}
function _check(fn, params) {
    const ch = new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheck({
        check: "custom",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
    ch._zod.check = fn;
    return ch;
}
function _stringbool(Classes, _params) {
    const params = _util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(_params);
    let truthyArray = params.truthy ?? ["true", "1", "yes", "on", "y", "enabled"];
    let falsyArray = params.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
    if (params.case !== "sensitive") {
        truthyArray = truthyArray.map((v) => (typeof v === "string" ? v.toLowerCase() : v));
        falsyArray = falsyArray.map((v) => (typeof v === "string" ? v.toLowerCase() : v));
    }
    const truthySet = new Set(truthyArray);
    const falsySet = new Set(falsyArray);
    const _Codec = Classes.Codec ?? _schemas_js__WEBPACK_IMPORTED_MODULE_1__.$ZodCodec;
    const _Boolean = Classes.Boolean ?? _schemas_js__WEBPACK_IMPORTED_MODULE_1__.$ZodBoolean;
    const _String = Classes.String ?? _schemas_js__WEBPACK_IMPORTED_MODULE_1__.$ZodString;
    const stringSchema = new _String({ type: "string", error: params.error });
    const booleanSchema = new _Boolean({ type: "boolean", error: params.error });
    const codec = new _Codec({
        type: "pipe",
        in: stringSchema,
        out: booleanSchema,
        transform: ((input, payload) => {
            let data = input;
            if (params.case !== "sensitive")
                data = data.toLowerCase();
            if (truthySet.has(data)) {
                return true;
            }
            else if (falsySet.has(data)) {
                return false;
            }
            else {
                payload.issues.push({
                    code: "invalid_value",
                    expected: "stringbool",
                    values: [...truthySet, ...falsySet],
                    input: payload.value,
                    inst: codec,
                    continue: false,
                });
                return {};
            }
        }),
        reverseTransform: ((input, _payload) => {
            if (input === true) {
                return truthyArray[0] || "true";
            }
            else {
                return falsyArray[0] || "false";
            }
        }),
        error: params.error,
    });
    return codec;
}
function _stringFormat(Class, format, fnOrRegex, _params = {}) {
    const params = _util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(_params);
    const def = {
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(_params),
        check: "string_format",
        type: "string",
        format,
        fn: typeof fnOrRegex === "function" ? fnOrRegex : (val) => fnOrRegex.test(val),
        ...params,
    };
    if (fnOrRegex instanceof RegExp) {
        def.pattern = fnOrRegex;
    }
    const inst = new Class(def);
    return inst;
}


/***/ }),

/***/ 555:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   parsedType: () => (/* binding */ parsedType)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const parsedType = (data) => {
    const t = typeof data;
    switch (t) {
        case "number": {
            return Number.isNaN(data) ? "NaN" : "númer";
        }
        case "object": {
            if (Array.isArray(data)) {
                return "fylki";
            }
            if (data === null) {
                return "null";
            }
            if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                return data.constructor.name;
            }
        }
    }
    return t;
};
const error = () => {
    const Sizable = {
        string: { unit: "stafi", verb: "að hafa" },
        file: { unit: "bæti", verb: "að hafa" },
        array: { unit: "hluti", verb: "að hafa" },
        set: { unit: "hluti", verb: "að hafa" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const Nouns = {
        regex: "gildi",
        email: "netfang",
        url: "vefslóð",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO dagsetning og tími",
        date: "ISO dagsetning",
        time: "ISO tími",
        duration: "ISO tímalengd",
        ipv4: "IPv4 address",
        ipv6: "IPv6 address",
        cidrv4: "IPv4 range",
        cidrv6: "IPv6 range",
        base64: "base64-encoded strengur",
        base64url: "base64url-encoded strengur",
        json_string: "JSON strengur",
        e164: "E.164 tölugildi",
        jwt: "JWT",
        template_literal: "gildi",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Rangt gildi: Þú slóst inn ${parsedType(issue.input)} þar sem á að vera ${issue.expected}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Rangt gildi: gert ráð fyrir ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Ógilt val: má vera eitt af eftirfarandi ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Of stórt: gert er ráð fyrir að ${issue.origin ?? "gildi"} hafi ${adj}${issue.maximum.toString()} ${sizing.unit ?? "hluti"}`;
                return `Of stórt: gert er ráð fyrir að ${issue.origin ?? "gildi"} sé ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Of lítið: gert er ráð fyrir að ${issue.origin} hafi ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `Of lítið: gert er ráð fyrir að ${issue.origin} sé ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with") {
                    return `Ógildur strengur: verður að byrja á "${_issue.prefix}"`;
                }
                if (_issue.format === "ends_with")
                    return `Ógildur strengur: verður að enda á "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Ógildur strengur: verður að innihalda "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Ógildur strengur: verður að fylgja mynstri ${_issue.pattern}`;
                return `Rangt ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Röng tala: verður að vera margfeldi af ${issue.divisor}`;
            case "unrecognized_keys":
                return `Óþekkt ${issue.keys.length > 1 ? "ir lyklar" : "ur lykill"}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Rangur lykill í ${issue.origin}`;
            case "invalid_union":
                return "Rangt gildi";
            case "invalid_element":
                return `Rangt gildi í ${issue.origin}`;
            default:
                return `Rangt gildi`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 1223:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PromptManager: () => (/* binding */ PromptManager),
/* harmony export */   promptManager: () => (/* binding */ promptManager)
/* harmony export */ });
/* harmony import */ var _globalState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5518);

// Prompt injection management using Tavern Helper APIs
class PromptManager {
    static instance;
    constructor() { }
    static getInstance() {
        if (!PromptManager.instance) {
            PromptManager.instance = new PromptManager();
        }
        return PromptManager.instance;
    }
    // Safe prompt injection with Tavern Helper API
    async safeInjectPrompt(id, content, role = 'system', position = 'in_chat', depth = 0) {
        try {
            // Clear existing injection if it exists
            if (_globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.get('ALARIC_INJECTED_PROMPTS').has(id)) {
                const oldUninject = _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.get('ALARIC_INJECTED_PROMPTS').get(id);
                if (typeof oldUninject === 'function') {
                    oldUninject();
                }
                _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.get('ALARIC_INJECTED_PROMPTS').delete(id);
            }
            // Use injectPrompts API if available (preferred)
            if (typeof injectPrompts === 'function') {
                console.log(`[NSFW引擎] 使用injectPrompts注入: ${id}, role: ${role}, position: ${position}`);
                const result = injectPrompts([{
                        id: id,
                        position: position,
                        depth: depth,
                        role: role,
                        content: content
                    }]);
                // Validate result
                if (result && typeof result.uninject === 'function') {
                    // Store uninject function
                    _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.get('ALARIC_INJECTED_PROMPTS').set(id, result.uninject);
                    console.log(`[NSFW引擎] 已注入提示词: ${id}, uninject函数已存储`);
                    return true;
                }
                else {
                    console.error(`[NSFW引擎] injectPrompts返回无效结果:`, result);
                    return false;
                }
            }
            else {
                console.warn('[NSFW引擎] injectPrompts API不可用，回退到triggerSlash');
                // Fallback to triggerSlash
                if (typeof triggerSlash === 'function') {
                    const injectCommand = `/inject id=${id} position=${position} role=${role} depth=${depth} "${content.replace(/"/g, '\\"')}"`;
                    triggerSlash(injectCommand);
                    console.log(`[NSFW引擎] 已注入提示词（旧方法）: ${id}`);
                    return true;
                }
            }
        }
        catch (error) {
            console.error('[NSFW引擎] 注入提示词失败:', error);
        }
        return false;
    }
    // Safe prompt uninjection
    safeUninjectPrompt(id) {
        try {
            if (_globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.get('ALARIC_INJECTED_PROMPTS').has(id)) {
                const uninject = _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.get('ALARIC_INJECTED_PROMPTS').get(id);
                if (typeof uninject === 'function') {
                    uninject();
                }
                _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.get('ALARIC_INJECTED_PROMPTS').delete(id);
                console.log(`[NSFW引擎] 已清除提示词: ${id}`);
                return true;
            }
            else {
                // Fallback to old method
                if (typeof triggerSlash === 'function') {
                    triggerSlash(`/inject id=${id} remove=true`);
                    console.log(`[NSFW引擎] 已清除提示词（旧方法）: ${id}`);
                    return true;
                }
            }
        }
        catch (error) {
            console.error('[NSFW引擎] 清除提示词失败:', error);
        }
        return false;
    }
    // Clear all injected prompts
    clearAllInjectedPrompts() {
        try {
            const ids = Array.from(_globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.get('ALARIC_INJECTED_PROMPTS').keys());
            if (ids.length > 0) {
                // Use new API for batch clearing
                if (typeof uninjectPrompts === 'function') {
                    uninjectPrompts(ids);
                    console.log(`[NSFW引擎] 已批量清除 ${ids.length} 个提示词`);
                }
                else {
                    // Fallback to old method
                    if (typeof triggerSlash === 'function') {
                        ids.forEach(id => {
                            try {
                                triggerSlash(`/inject id=${id} remove=true`);
                            }
                            catch (e) {
                                // Ignore errors
                            }
                        });
                        console.log(`[NSFW引擎] 已清除 ${ids.length} 个提示词（旧方法）`);
                    }
                }
                _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.get('ALARIC_INJECTED_PROMPTS').clear();
            }
        }
        catch (error) {
            console.error('[NSFW引擎] 批量清除提示词失败:', error);
        }
    }
    // Inject SOP content
    async injectSop(sopContent, sopId) {
        const success = await this.safeInjectPrompt('alaric_current_sop', sopContent, 'system', 'in_chat', 0);
        if (success) {
            _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.set('ALARIC_CURRENT_SOP', sopContent);
            _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.set('ALARIC_CURRENT_SOP_ID', sopId);
        }
        return success;
    }
    // Inject spice content
    async injectSpice(spiceContent) {
        const success = await this.safeInjectPrompt('alaric_current_spice', spiceContent, 'system', 'in_chat', 0);
        if (success) {
            _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.set('ALARIC_CURRENT_SPICE', spiceContent);
        }
        return success;
    }
    // Inject aftercare content
    async injectAftercare(aftercareContent) {
        const success = await this.safeInjectPrompt('alaric_aftercare', aftercareContent, 'system', 'in_chat', 0);
        if (success) {
            _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.set('ALARIC_AFTERCARE_INJECTED', true);
        }
        return success;
    }
    // Clear all SOP-related injections
    clearSopInjections() {
        this.safeUninjectPrompt('alaric_current_sop');
        this.safeUninjectPrompt('alaric_current_spice');
        this.safeUninjectPrompt('alaric_aftercare');
        // Reset state
        _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.set('ALARIC_CURRENT_SOP', null);
        _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.set('ALARIC_CURRENT_SOP_ID', null);
        _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.set('ALARIC_CURRENT_SPICE', null);
        _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.set('ALARIC_SOP_ACTIVE', false);
        _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.set('ALARIC_AFTERCARE_INJECTED', false);
    }
    // Clear daily flirt injections
    clearDailyInjections() {
        // Clear all possible daily injection IDs
        const dailyIds = ['alaric_auto_daily', 'alaric_manual_daily'];
        dailyIds.forEach(id => this.safeUninjectPrompt(id));
        // Also clear using old method for compatibility
        if (typeof triggerSlash === 'function') {
            dailyIds.forEach(id => {
                try {
                    triggerSlash(`/inject id=${id} remove=true`);
                }
                catch (e) {
                    // Ignore errors
                }
            });
        }
    }
    // Get injection status for display
    getInjectionStatus() {
        let status = '📋 当前注入状态\n\n';
        // Check main SOP injection
        if (_globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.get('ALARIC_CURRENT_SOP')) {
            const sopMatch = _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.get('ALARIC_CURRENT_SOP').match(/\[SOP(?:指导)?:\s*([^\]]+)\]/);
            const sopName = sopMatch ? sopMatch[1] : '未知玩法';
            const modeText = _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.get('ALARIC_CURRENT_SOP').includes('Deep Protocol') ? '深度调教' :
                _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.get('ALARIC_CURRENT_SOP').includes('Quick Service Protocol') ? '快餐服务' :
                    _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.get('ALARIC_CURRENT_SOP').includes('Remote Domination Protocol') ? '远程支配' :
                        _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.get('ALARIC_CURRENT_SOP').includes('Daily') ? '日常调情' : '未知模式';
            const activeStatus = _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.get('ALARIC_SOP_ACTIVE') ? '✅ 已激活' : '⏳ 已注入但未激活';
            status += `🎲 主菜玩法: ${sopName}\n`;
            status += `🎯 模式: ${modeText}\n`;
            status += `📊 状态: ${activeStatus}\n\n`;
        }
        else {
            status += '🎲 主菜玩法: 未注入\n\n';
        }
        // Check spice injection
        if (_globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.get('ALARIC_CURRENT_SPICE')) {
            const spiceMatches = _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.get('ALARIC_CURRENT_SPICE').match(/\[佐料:\s*([^\]]+)\]/g);
            if (spiceMatches && spiceMatches.length > 0) {
                const spiceNames = spiceMatches.map(match => {
                    const nameMatch = match.match(/\[佐料:\s*([^\]]+)\]/);
                    return nameMatch ? nameMatch[1] : '未知佐料';
                });
                status += `🍅 佐料: ${spiceNames.join(', ')}\n\n`;
            }
            else {
                status += '🍅 佐料: 已添加但格式未知\n\n';
            }
        }
        else {
            status += '🍅 佐料: 未添加\n\n';
        }
        // Check daily injections
        const hasAutoDaily = _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.get('ALARIC_INJECTED_PROMPTS').has('alaric_auto_daily');
        const hasManualDaily = _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.get('ALARIC_INJECTED_PROMPTS').has('alaric_manual_daily');
        if (hasAutoDaily || hasManualDaily) {
            const dailyTypes = [];
            if (hasAutoDaily)
                dailyTypes.push('自动');
            if (hasManualDaily)
                dailyTypes.push('手动');
            status += `💋 日常调情: ${dailyTypes.join('+')}注入\n\n`;
        }
        else {
            status += '💋 日常调情: 未注入\n\n';
        }
        // Check aftercare
        if (_globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.get('ALARIC_AFTERCARE_INJECTED')) {
            status += '💕 事后安抚: 已注入\n\n';
        }
        else {
            status += '💕 事后安抚: 未注入\n\n';
        }
        return status;
    }
}
// Export singleton instance
const promptManager = PromptManager.getInstance();


/***/ }),

/***/ 1240:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "karakter", verb: "legyen" },
        file: { unit: "byte", verb: "legyen" },
        array: { unit: "elem", verb: "legyen" },
        set: { unit: "elem", verb: "legyen" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "szám";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "tömb";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "bemenet",
        email: "email cím",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO időbélyeg",
        date: "ISO dátum",
        time: "ISO idő",
        duration: "ISO időintervallum",
        ipv4: "IPv4 cím",
        ipv6: "IPv6 cím",
        cidrv4: "IPv4 tartomány",
        cidrv6: "IPv6 tartomány",
        base64: "base64-kódolt string",
        base64url: "base64url-kódolt string",
        json_string: "JSON string",
        e164: "E.164 szám",
        jwt: "JWT",
        template_literal: "bemenet",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Érvénytelen bemenet: a várt érték ${issue.expected}, a kapott érték ${parsedType(issue.input)}`;
            // return `Invalid input: expected ${issue.expected}, received ${util.getParsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Érvénytelen bemenet: a várt érték ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Érvénytelen opció: valamelyik érték várt ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Túl nagy: ${issue.origin ?? "érték"} mérete túl nagy ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elem"}`;
                return `Túl nagy: a bemeneti érték ${issue.origin ?? "érték"} túl nagy: ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Túl kicsi: a bemeneti érték ${issue.origin} mérete túl kicsi ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `Túl kicsi: a bemeneti érték ${issue.origin} túl kicsi ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `Érvénytelen string: "${_issue.prefix}" értékkel kell kezdődnie`;
                if (_issue.format === "ends_with")
                    return `Érvénytelen string: "${_issue.suffix}" értékkel kell végződnie`;
                if (_issue.format === "includes")
                    return `Érvénytelen string: "${_issue.includes}" értéket kell tartalmaznia`;
                if (_issue.format === "regex")
                    return `Érvénytelen string: ${_issue.pattern} mintának kell megfelelnie`;
                return `Érvénytelen ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Érvénytelen szám: ${issue.divisor} többszörösének kell lennie`;
            case "unrecognized_keys":
                return `Ismeretlen kulcs${issue.keys.length > 1 ? "s" : ""}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Érvénytelen kulcs ${issue.origin}`;
            case "invalid_union":
                return "Érvénytelen bemenet";
            case "invalid_element":
                return `Érvénytelen érték: ${issue.origin}`;
            default:
                return `Érvénytelen bemenet`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 1270:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "کاراکتر", verb: "داشته باشد" },
        file: { unit: "بایت", verb: "داشته باشد" },
        array: { unit: "آیتم", verb: "داشته باشد" },
        set: { unit: "آیتم", verb: "داشته باشد" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "عدد";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "آرایه";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "ورودی",
        email: "آدرس ایمیل",
        url: "URL",
        emoji: "ایموجی",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "تاریخ و زمان ایزو",
        date: "تاریخ ایزو",
        time: "زمان ایزو",
        duration: "مدت زمان ایزو",
        ipv4: "IPv4 آدرس",
        ipv6: "IPv6 آدرس",
        cidrv4: "IPv4 دامنه",
        cidrv6: "IPv6 دامنه",
        base64: "base64-encoded رشته",
        base64url: "base64url-encoded رشته",
        json_string: "JSON رشته",
        e164: "E.164 عدد",
        jwt: "JWT",
        template_literal: "ورودی",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `ورودی نامعتبر: می‌بایست ${issue.expected} می‌بود، ${parsedType(issue.input)} دریافت شد`;
            case "invalid_value":
                if (issue.values.length === 1) {
                    return `ورودی نامعتبر: می‌بایست ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])} می‌بود`;
                }
                return `گزینه نامعتبر: می‌بایست یکی از ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")} می‌بود`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `خیلی بزرگ: ${issue.origin ?? "مقدار"} باید ${adj}${issue.maximum.toString()} ${sizing.unit ?? "عنصر"} باشد`;
                }
                return `خیلی بزرگ: ${issue.origin ?? "مقدار"} باید ${adj}${issue.maximum.toString()} باشد`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `خیلی کوچک: ${issue.origin} باید ${adj}${issue.minimum.toString()} ${sizing.unit} باشد`;
                }
                return `خیلی کوچک: ${issue.origin} باید ${adj}${issue.minimum.toString()} باشد`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with") {
                    return `رشته نامعتبر: باید با "${_issue.prefix}" شروع شود`;
                }
                if (_issue.format === "ends_with") {
                    return `رشته نامعتبر: باید با "${_issue.suffix}" تمام شود`;
                }
                if (_issue.format === "includes") {
                    return `رشته نامعتبر: باید شامل "${_issue.includes}" باشد`;
                }
                if (_issue.format === "regex") {
                    return `رشته نامعتبر: باید با الگوی ${_issue.pattern} مطابقت داشته باشد`;
                }
                return `${Nouns[_issue.format] ?? issue.format} نامعتبر`;
            }
            case "not_multiple_of":
                return `عدد نامعتبر: باید مضرب ${issue.divisor} باشد`;
            case "unrecognized_keys":
                return `کلید${issue.keys.length > 1 ? "های" : ""} ناشناس: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `کلید ناشناس در ${issue.origin}`;
            case "invalid_union":
                return `ورودی نامعتبر`;
            case "invalid_element":
                return `مقدار نامعتبر در ${issue.origin}`;
            default:
                return `ورودی نامعتبر`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 1564:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   parsedType: () => (/* binding */ parsedType)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const parsedType = (data) => {
    const t = typeof data;
    switch (t) {
        case "number": {
            return Number.isNaN(data) ? "NaN" : "number";
        }
        case "object": {
            if (Array.isArray(data)) {
                return "array";
            }
            if (data === null) {
                return "null";
            }
            if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                return data.constructor.name;
            }
        }
    }
    return t;
};
const error = () => {
    const Sizable = {
        string: { unit: "characters", verb: "to have" },
        file: { unit: "bytes", verb: "to have" },
        array: { unit: "items", verb: "to have" },
        set: { unit: "items", verb: "to have" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const Nouns = {
        regex: "input",
        email: "email address",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO datetime",
        date: "ISO date",
        time: "ISO time",
        duration: "ISO duration",
        ipv4: "IPv4 address",
        ipv6: "IPv6 address",
        cidrv4: "IPv4 range",
        cidrv6: "IPv6 range",
        base64: "base64-encoded string",
        base64url: "base64url-encoded string",
        json_string: "JSON string",
        e164: "E.164 number",
        jwt: "JWT",
        template_literal: "input",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Invalid input: expected ${issue.expected}, received ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Invalid input: expected ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Invalid option: expected one of ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Too big: expected ${issue.origin ?? "value"} to have ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
                return `Too big: expected ${issue.origin ?? "value"} to be ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Too small: expected ${issue.origin} to have ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `Too small: expected ${issue.origin} to be ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with") {
                    return `Invalid string: must start with "${_issue.prefix}"`;
                }
                if (_issue.format === "ends_with")
                    return `Invalid string: must end with "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Invalid string: must include "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Invalid string: must match pattern ${_issue.pattern}`;
                return `Invalid ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Invalid number: must be a multiple of ${issue.divisor}`;
            case "unrecognized_keys":
                return `Unrecognized key${issue.keys.length > 1 ? "s" : ""}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Invalid key in ${issue.origin}`;
            case "invalid_union":
                return "Invalid input";
            case "invalid_element":
                return `Invalid value in ${issue.origin}`;
            default:
                return `Invalid input`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 1601:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "символів", verb: "матиме" },
        file: { unit: "байтів", verb: "матиме" },
        array: { unit: "елементів", verb: "матиме" },
        set: { unit: "елементів", verb: "матиме" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "число";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "масив";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "вхідні дані",
        email: "адреса електронної пошти",
        url: "URL",
        emoji: "емодзі",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "дата та час ISO",
        date: "дата ISO",
        time: "час ISO",
        duration: "тривалість ISO",
        ipv4: "адреса IPv4",
        ipv6: "адреса IPv6",
        cidrv4: "діапазон IPv4",
        cidrv6: "діапазон IPv6",
        base64: "рядок у кодуванні base64",
        base64url: "рядок у кодуванні base64url",
        json_string: "рядок JSON",
        e164: "номер E.164",
        jwt: "JWT",
        template_literal: "вхідні дані",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Неправильні вхідні дані: очікується ${issue.expected}, отримано ${parsedType(issue.input)}`;
            // return `Неправильні вхідні дані: очікується ${issue.expected}, отримано ${util.getParsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Неправильні вхідні дані: очікується ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Неправильна опція: очікується одне з ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Занадто велике: очікується, що ${issue.origin ?? "значення"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "елементів"}`;
                return `Занадто велике: очікується, що ${issue.origin ?? "значення"} буде ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Занадто мале: очікується, що ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `Занадто мале: очікується, що ${issue.origin} буде ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `Неправильний рядок: повинен починатися з "${_issue.prefix}"`;
                if (_issue.format === "ends_with")
                    return `Неправильний рядок: повинен закінчуватися на "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Неправильний рядок: повинен містити "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Неправильний рядок: повинен відповідати шаблону ${_issue.pattern}`;
                return `Неправильний ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Неправильне число: повинно бути кратним ${issue.divisor}`;
            case "unrecognized_keys":
                return `Нерозпізнаний ключ${issue.keys.length > 1 ? "і" : ""}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Неправильний ключ у ${issue.origin}`;
            case "invalid_union":
                return "Неправильні вхідні дані";
            case "invalid_element":
                return `Неправильне значення у ${issue.origin}`;
            default:
                return `Неправильні вхідні дані`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 1709:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "znaků", verb: "mít" },
        file: { unit: "bajtů", verb: "mít" },
        array: { unit: "prvků", verb: "mít" },
        set: { unit: "prvků", verb: "mít" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "číslo";
            }
            case "string": {
                return "řetězec";
            }
            case "boolean": {
                return "boolean";
            }
            case "bigint": {
                return "bigint";
            }
            case "function": {
                return "funkce";
            }
            case "symbol": {
                return "symbol";
            }
            case "undefined": {
                return "undefined";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "pole";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "regulární výraz",
        email: "e-mailová adresa",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "datum a čas ve formátu ISO",
        date: "datum ve formátu ISO",
        time: "čas ve formátu ISO",
        duration: "doba trvání ISO",
        ipv4: "IPv4 adresa",
        ipv6: "IPv6 adresa",
        cidrv4: "rozsah IPv4",
        cidrv6: "rozsah IPv6",
        base64: "řetězec zakódovaný ve formátu base64",
        base64url: "řetězec zakódovaný ve formátu base64url",
        json_string: "řetězec ve formátu JSON",
        e164: "číslo E.164",
        jwt: "JWT",
        template_literal: "vstup",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Neplatný vstup: očekáváno ${issue.expected}, obdrženo ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Neplatný vstup: očekáváno ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Neplatná možnost: očekávána jedna z hodnot ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Hodnota je příliš velká: ${issue.origin ?? "hodnota"} musí mít ${adj}${issue.maximum.toString()} ${sizing.unit ?? "prvků"}`;
                }
                return `Hodnota je příliš velká: ${issue.origin ?? "hodnota"} musí být ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Hodnota je příliš malá: ${issue.origin ?? "hodnota"} musí mít ${adj}${issue.minimum.toString()} ${sizing.unit ?? "prvků"}`;
                }
                return `Hodnota je příliš malá: ${issue.origin ?? "hodnota"} musí být ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `Neplatný řetězec: musí začínat na "${_issue.prefix}"`;
                if (_issue.format === "ends_with")
                    return `Neplatný řetězec: musí končit na "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Neplatný řetězec: musí obsahovat "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Neplatný řetězec: musí odpovídat vzoru ${_issue.pattern}`;
                return `Neplatný formát ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Neplatné číslo: musí být násobkem ${issue.divisor}`;
            case "unrecognized_keys":
                return `Neznámé klíče: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Neplatný klíč v ${issue.origin}`;
            case "invalid_union":
                return "Neplatný vstup";
            case "invalid_element":
                return `Neplatná hodnota v ${issue.origin}`;
            default:
                return `Neplatný vstup`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 1732:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $ZodRegistry: () => (/* binding */ $ZodRegistry),
/* harmony export */   $input: () => (/* binding */ $input),
/* harmony export */   $output: () => (/* binding */ $output),
/* harmony export */   globalRegistry: () => (/* binding */ globalRegistry),
/* harmony export */   registry: () => (/* binding */ registry)
/* harmony export */ });
const $output = Symbol("ZodOutput");
const $input = Symbol("ZodInput");
class $ZodRegistry {
    constructor() {
        this._map = new Map();
        this._idmap = new Map();
    }
    add(schema, ..._meta) {
        const meta = _meta[0];
        this._map.set(schema, meta);
        if (meta && typeof meta === "object" && "id" in meta) {
            if (this._idmap.has(meta.id)) {
                throw new Error(`ID ${meta.id} already exists in the registry`);
            }
            this._idmap.set(meta.id, schema);
        }
        return this;
    }
    clear() {
        this._map = new Map();
        this._idmap = new Map();
        return this;
    }
    remove(schema) {
        const meta = this._map.get(schema);
        if (meta && typeof meta === "object" && "id" in meta) {
            this._idmap.delete(meta.id);
        }
        this._map.delete(schema);
        return this;
    }
    get(schema) {
        // return this._map.get(schema) as any;
        // inherit metadata
        const p = schema._zod.parent;
        if (p) {
            const pm = { ...(this.get(p) ?? {}) };
            delete pm.id; // do not inherit id
            const f = { ...pm, ...this._map.get(schema) };
            return Object.keys(f).length ? f : undefined;
        }
        return this._map.get(schema);
    }
    has(schema) {
        return this._map.has(schema);
    }
}
// registries
function registry() {
    return new $ZodRegistry();
}
const globalRegistry = /*@__PURE__*/ registry();


/***/ }),

/***/ 1792:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "znakov", verb: "imeti" },
        file: { unit: "bajtov", verb: "imeti" },
        array: { unit: "elementov", verb: "imeti" },
        set: { unit: "elementov", verb: "imeti" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "število";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "tabela";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "vnos",
        email: "e-poštni naslov",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO datum in čas",
        date: "ISO datum",
        time: "ISO čas",
        duration: "ISO trajanje",
        ipv4: "IPv4 naslov",
        ipv6: "IPv6 naslov",
        cidrv4: "obseg IPv4",
        cidrv6: "obseg IPv6",
        base64: "base64 kodiran niz",
        base64url: "base64url kodiran niz",
        json_string: "JSON niz",
        e164: "E.164 številka",
        jwt: "JWT",
        template_literal: "vnos",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Neveljaven vnos: pričakovano ${issue.expected}, prejeto ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Neveljaven vnos: pričakovano ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Neveljavna možnost: pričakovano eno izmed ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Preveliko: pričakovano, da bo ${issue.origin ?? "vrednost"} imelo ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementov"}`;
                return `Preveliko: pričakovano, da bo ${issue.origin ?? "vrednost"} ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Premajhno: pričakovano, da bo ${issue.origin} imelo ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `Premajhno: pričakovano, da bo ${issue.origin} ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with") {
                    return `Neveljaven niz: mora se začeti z "${_issue.prefix}"`;
                }
                if (_issue.format === "ends_with")
                    return `Neveljaven niz: mora se končati z "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Neveljaven niz: mora vsebovati "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Neveljaven niz: mora ustrezati vzorcu ${_issue.pattern}`;
                return `Neveljaven ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Neveljavno število: mora biti večkratnik ${issue.divisor}`;
            case "unrecognized_keys":
                return `Neprepoznan${issue.keys.length > 1 ? "i ključi" : " ključ"}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Neveljaven ključ v ${issue.origin}`;
            case "invalid_union":
                return "Neveljaven vnos";
            case "invalid_element":
                return `Neveljavna vrednost v ${issue.origin}`;
            default:
                return "Neveljaven vnos";
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 2001:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   parsedType: () => (/* binding */ parsedType)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const parsedType = (data) => {
    const t = typeof data;
    switch (t) {
        case "number": {
            return Number.isNaN(data) ? "NaN" : "number";
        }
        case "object": {
            if (Array.isArray(data)) {
                return "array";
            }
            if (data === null) {
                return "null";
            }
            if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                return data.constructor.name;
            }
        }
    }
    return t;
};
const error = () => {
    const Sizable = {
        string: { unit: "karakter", verb: "olmalı" },
        file: { unit: "bayt", verb: "olmalı" },
        array: { unit: "öğe", verb: "olmalı" },
        set: { unit: "öğe", verb: "olmalı" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const Nouns = {
        regex: "girdi",
        email: "e-posta adresi",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO tarih ve saat",
        date: "ISO tarih",
        time: "ISO saat",
        duration: "ISO süre",
        ipv4: "IPv4 adresi",
        ipv6: "IPv6 adresi",
        cidrv4: "IPv4 aralığı",
        cidrv6: "IPv6 aralığı",
        base64: "base64 ile şifrelenmiş metin",
        base64url: "base64url ile şifrelenmiş metin",
        json_string: "JSON dizesi",
        e164: "E.164 sayısı",
        jwt: "JWT",
        template_literal: "Şablon dizesi",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Geçersiz değer: beklenen ${issue.expected}, alınan ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Geçersiz değer: beklenen ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Geçersiz seçenek: aşağıdakilerden biri olmalı: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Çok büyük: beklenen ${issue.origin ?? "değer"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "öğe"}`;
                return `Çok büyük: beklenen ${issue.origin ?? "değer"} ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Çok küçük: beklenen ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                return `Çok küçük: beklenen ${issue.origin} ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `Geçersiz metin: "${_issue.prefix}" ile başlamalı`;
                if (_issue.format === "ends_with")
                    return `Geçersiz metin: "${_issue.suffix}" ile bitmeli`;
                if (_issue.format === "includes")
                    return `Geçersiz metin: "${_issue.includes}" içermeli`;
                if (_issue.format === "regex")
                    return `Geçersiz metin: ${_issue.pattern} desenine uymalı`;
                return `Geçersiz ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Geçersiz sayı: ${issue.divisor} ile tam bölünebilmeli`;
            case "unrecognized_keys":
                return `Tanınmayan anahtar${issue.keys.length > 1 ? "lar" : ""}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `${issue.origin} içinde geçersiz anahtar`;
            case "invalid_union":
                return "Geçersiz değer";
            case "invalid_element":
                return `${issue.origin} içinde geçersiz değer`;
            default:
                return `Geçersiz değer`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 2151:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $ZodAny: () => (/* binding */ $ZodAny),
/* harmony export */   $ZodArray: () => (/* binding */ $ZodArray),
/* harmony export */   $ZodBase64: () => (/* binding */ $ZodBase64),
/* harmony export */   $ZodBase64URL: () => (/* binding */ $ZodBase64URL),
/* harmony export */   $ZodBigInt: () => (/* binding */ $ZodBigInt),
/* harmony export */   $ZodBigIntFormat: () => (/* binding */ $ZodBigIntFormat),
/* harmony export */   $ZodBoolean: () => (/* binding */ $ZodBoolean),
/* harmony export */   $ZodCIDRv4: () => (/* binding */ $ZodCIDRv4),
/* harmony export */   $ZodCIDRv6: () => (/* binding */ $ZodCIDRv6),
/* harmony export */   $ZodCUID: () => (/* binding */ $ZodCUID),
/* harmony export */   $ZodCUID2: () => (/* binding */ $ZodCUID2),
/* harmony export */   $ZodCatch: () => (/* binding */ $ZodCatch),
/* harmony export */   $ZodCodec: () => (/* binding */ $ZodCodec),
/* harmony export */   $ZodCustom: () => (/* binding */ $ZodCustom),
/* harmony export */   $ZodCustomStringFormat: () => (/* binding */ $ZodCustomStringFormat),
/* harmony export */   $ZodDate: () => (/* binding */ $ZodDate),
/* harmony export */   $ZodDefault: () => (/* binding */ $ZodDefault),
/* harmony export */   $ZodDiscriminatedUnion: () => (/* binding */ $ZodDiscriminatedUnion),
/* harmony export */   $ZodE164: () => (/* binding */ $ZodE164),
/* harmony export */   $ZodEmail: () => (/* binding */ $ZodEmail),
/* harmony export */   $ZodEmoji: () => (/* binding */ $ZodEmoji),
/* harmony export */   $ZodEnum: () => (/* binding */ $ZodEnum),
/* harmony export */   $ZodFile: () => (/* binding */ $ZodFile),
/* harmony export */   $ZodFunction: () => (/* binding */ $ZodFunction),
/* harmony export */   $ZodGUID: () => (/* binding */ $ZodGUID),
/* harmony export */   $ZodIPv4: () => (/* binding */ $ZodIPv4),
/* harmony export */   $ZodIPv6: () => (/* binding */ $ZodIPv6),
/* harmony export */   $ZodISODate: () => (/* binding */ $ZodISODate),
/* harmony export */   $ZodISODateTime: () => (/* binding */ $ZodISODateTime),
/* harmony export */   $ZodISODuration: () => (/* binding */ $ZodISODuration),
/* harmony export */   $ZodISOTime: () => (/* binding */ $ZodISOTime),
/* harmony export */   $ZodIntersection: () => (/* binding */ $ZodIntersection),
/* harmony export */   $ZodJWT: () => (/* binding */ $ZodJWT),
/* harmony export */   $ZodKSUID: () => (/* binding */ $ZodKSUID),
/* harmony export */   $ZodLazy: () => (/* binding */ $ZodLazy),
/* harmony export */   $ZodLiteral: () => (/* binding */ $ZodLiteral),
/* harmony export */   $ZodMap: () => (/* binding */ $ZodMap),
/* harmony export */   $ZodNaN: () => (/* binding */ $ZodNaN),
/* harmony export */   $ZodNanoID: () => (/* binding */ $ZodNanoID),
/* harmony export */   $ZodNever: () => (/* binding */ $ZodNever),
/* harmony export */   $ZodNonOptional: () => (/* binding */ $ZodNonOptional),
/* harmony export */   $ZodNull: () => (/* binding */ $ZodNull),
/* harmony export */   $ZodNullable: () => (/* binding */ $ZodNullable),
/* harmony export */   $ZodNumber: () => (/* binding */ $ZodNumber),
/* harmony export */   $ZodNumberFormat: () => (/* binding */ $ZodNumberFormat),
/* harmony export */   $ZodObject: () => (/* binding */ $ZodObject),
/* harmony export */   $ZodObjectJIT: () => (/* binding */ $ZodObjectJIT),
/* harmony export */   $ZodOptional: () => (/* binding */ $ZodOptional),
/* harmony export */   $ZodPipe: () => (/* binding */ $ZodPipe),
/* harmony export */   $ZodPrefault: () => (/* binding */ $ZodPrefault),
/* harmony export */   $ZodPromise: () => (/* binding */ $ZodPromise),
/* harmony export */   $ZodReadonly: () => (/* binding */ $ZodReadonly),
/* harmony export */   $ZodRecord: () => (/* binding */ $ZodRecord),
/* harmony export */   $ZodSet: () => (/* binding */ $ZodSet),
/* harmony export */   $ZodString: () => (/* binding */ $ZodString),
/* harmony export */   $ZodStringFormat: () => (/* binding */ $ZodStringFormat),
/* harmony export */   $ZodSuccess: () => (/* binding */ $ZodSuccess),
/* harmony export */   $ZodSymbol: () => (/* binding */ $ZodSymbol),
/* harmony export */   $ZodTemplateLiteral: () => (/* binding */ $ZodTemplateLiteral),
/* harmony export */   $ZodTransform: () => (/* binding */ $ZodTransform),
/* harmony export */   $ZodTuple: () => (/* binding */ $ZodTuple),
/* harmony export */   $ZodType: () => (/* binding */ $ZodType),
/* harmony export */   $ZodULID: () => (/* binding */ $ZodULID),
/* harmony export */   $ZodURL: () => (/* binding */ $ZodURL),
/* harmony export */   $ZodUUID: () => (/* binding */ $ZodUUID),
/* harmony export */   $ZodUndefined: () => (/* binding */ $ZodUndefined),
/* harmony export */   $ZodUnion: () => (/* binding */ $ZodUnion),
/* harmony export */   $ZodUnknown: () => (/* binding */ $ZodUnknown),
/* harmony export */   $ZodVoid: () => (/* binding */ $ZodVoid),
/* harmony export */   $ZodXID: () => (/* binding */ $ZodXID),
/* harmony export */   clone: () => (/* reexport safe */ _util_js__WEBPACK_IMPORTED_MODULE_5__.clone),
/* harmony export */   isValidBase64: () => (/* binding */ isValidBase64),
/* harmony export */   isValidBase64URL: () => (/* binding */ isValidBase64URL),
/* harmony export */   isValidJWT: () => (/* binding */ isValidJWT)
/* harmony export */ });
/* harmony import */ var _checks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8250);
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7476);
/* harmony import */ var _doc_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(201);
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8308);
/* harmony import */ var _regexes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2996);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4995);
/* harmony import */ var _versions_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7942);







const $ZodType = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodType", (inst, def) => {
    var _a;
    inst ?? (inst = {});
    inst._zod.def = def; // set _def property
    inst._zod.bag = inst._zod.bag || {}; // initialize _bag object
    inst._zod.version = _versions_js__WEBPACK_IMPORTED_MODULE_6__.version;
    const checks = [...(inst._zod.def.checks ?? [])];
    // if inst is itself a checks.$ZodCheck, run it as a check
    if (inst._zod.traits.has("$ZodCheck")) {
        checks.unshift(inst);
    }
    for (const ch of checks) {
        for (const fn of ch._zod.onattach) {
            fn(inst);
        }
    }
    if (checks.length === 0) {
        // deferred initializer
        // inst._zod.parse is not yet defined
        (_a = inst._zod).deferred ?? (_a.deferred = []);
        inst._zod.deferred?.push(() => {
            inst._zod.run = inst._zod.parse;
        });
    }
    else {
        const runChecks = (payload, checks, ctx) => {
            let isAborted = _util_js__WEBPACK_IMPORTED_MODULE_5__.aborted(payload);
            let asyncResult;
            for (const ch of checks) {
                if (ch._zod.def.when) {
                    const shouldRun = ch._zod.def.when(payload);
                    if (!shouldRun)
                        continue;
                }
                else if (isAborted) {
                    continue;
                }
                const currLen = payload.issues.length;
                const _ = ch._zod.check(payload);
                if (_ instanceof Promise && ctx?.async === false) {
                    throw new _core_js__WEBPACK_IMPORTED_MODULE_1__.$ZodAsyncError();
                }
                if (asyncResult || _ instanceof Promise) {
                    asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
                        await _;
                        const nextLen = payload.issues.length;
                        if (nextLen === currLen)
                            return;
                        if (!isAborted)
                            isAborted = _util_js__WEBPACK_IMPORTED_MODULE_5__.aborted(payload, currLen);
                    });
                }
                else {
                    const nextLen = payload.issues.length;
                    if (nextLen === currLen)
                        continue;
                    if (!isAborted)
                        isAborted = _util_js__WEBPACK_IMPORTED_MODULE_5__.aborted(payload, currLen);
                }
            }
            if (asyncResult) {
                return asyncResult.then(() => {
                    return payload;
                });
            }
            return payload;
        };
        // const handleChecksResult = (
        //   checkResult: ParsePayload,
        //   originalResult: ParsePayload,
        //   ctx: ParseContextInternal
        // ): util.MaybeAsync<ParsePayload> => {
        //   // if the checks mutated the value && there are no issues, re-parse the result
        //   if (checkResult.value !== originalResult.value && !checkResult.issues.length)
        //     return inst._zod.parse(checkResult, ctx);
        //   return originalResult;
        // };
        const handleCanaryResult = (canary, payload, ctx) => {
            // abort if the canary is aborted
            if (_util_js__WEBPACK_IMPORTED_MODULE_5__.aborted(canary)) {
                canary.aborted = true;
                return canary;
            }
            // run checks first, then
            const checkResult = runChecks(payload, checks, ctx);
            if (checkResult instanceof Promise) {
                if (ctx.async === false)
                    throw new _core_js__WEBPACK_IMPORTED_MODULE_1__.$ZodAsyncError();
                return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
            }
            return inst._zod.parse(checkResult, ctx);
        };
        inst._zod.run = (payload, ctx) => {
            if (ctx.skipChecks) {
                return inst._zod.parse(payload, ctx);
            }
            if (ctx.direction === "backward") {
                // run canary
                // initial pass (no checks)
                const canary = inst._zod.parse({ value: payload.value, issues: [] }, { ...ctx, skipChecks: true });
                if (canary instanceof Promise) {
                    return canary.then((canary) => {
                        return handleCanaryResult(canary, payload, ctx);
                    });
                }
                return handleCanaryResult(canary, payload, ctx);
            }
            // forward
            const result = inst._zod.parse(payload, ctx);
            if (result instanceof Promise) {
                if (ctx.async === false)
                    throw new _core_js__WEBPACK_IMPORTED_MODULE_1__.$ZodAsyncError();
                return result.then((result) => runChecks(result, checks, ctx));
            }
            return runChecks(result, checks, ctx);
        };
    }
    inst["~standard"] = {
        validate: (value) => {
            try {
                const r = (0,_parse_js__WEBPACK_IMPORTED_MODULE_3__.safeParse)(inst, value);
                return r.success ? { value: r.data } : { issues: r.error?.issues };
            }
            catch (_) {
                return (0,_parse_js__WEBPACK_IMPORTED_MODULE_3__.safeParseAsync)(inst, value).then((r) => (r.success ? { value: r.data } : { issues: r.error?.issues }));
            }
        },
        vendor: "zod",
        version: 1,
    };
});

const $ZodString = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodString", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.pattern = [...(inst?._zod.bag?.patterns ?? [])].pop() ?? _regexes_js__WEBPACK_IMPORTED_MODULE_4__.string(inst._zod.bag);
    inst._zod.parse = (payload, _) => {
        if (def.coerce)
            try {
                payload.value = String(payload.value);
            }
            catch (_) { }
        if (typeof payload.value === "string")
            return payload;
        payload.issues.push({
            expected: "string",
            code: "invalid_type",
            input: payload.value,
            inst,
        });
        return payload;
    };
});
const $ZodStringFormat = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodStringFormat", (inst, def) => {
    // check initialization must come first
    _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckStringFormat.init(inst, def);
    $ZodString.init(inst, def);
});
const $ZodGUID = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodGUID", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.guid);
    $ZodStringFormat.init(inst, def);
});
const $ZodUUID = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodUUID", (inst, def) => {
    if (def.version) {
        const versionMap = {
            v1: 1,
            v2: 2,
            v3: 3,
            v4: 4,
            v5: 5,
            v6: 6,
            v7: 7,
            v8: 8,
        };
        const v = versionMap[def.version];
        if (v === undefined)
            throw new Error(`Invalid UUID version: "${def.version}"`);
        def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.uuid(v));
    }
    else
        def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.uuid());
    $ZodStringFormat.init(inst, def);
});
const $ZodEmail = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodEmail", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.email);
    $ZodStringFormat.init(inst, def);
});
const $ZodURL = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodURL", (inst, def) => {
    $ZodStringFormat.init(inst, def);
    inst._zod.check = (payload) => {
        try {
            // Trim whitespace from input
            const trimmed = payload.value.trim();
            // @ts-ignore
            const url = new URL(trimmed);
            if (def.hostname) {
                def.hostname.lastIndex = 0;
                if (!def.hostname.test(url.hostname)) {
                    payload.issues.push({
                        code: "invalid_format",
                        format: "url",
                        note: "Invalid hostname",
                        pattern: _regexes_js__WEBPACK_IMPORTED_MODULE_4__.hostname.source,
                        input: payload.value,
                        inst,
                        continue: !def.abort,
                    });
                }
            }
            if (def.protocol) {
                def.protocol.lastIndex = 0;
                if (!def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol)) {
                    payload.issues.push({
                        code: "invalid_format",
                        format: "url",
                        note: "Invalid protocol",
                        pattern: def.protocol.source,
                        input: payload.value,
                        inst,
                        continue: !def.abort,
                    });
                }
            }
            // Set the output value based on normalize flag
            if (def.normalize) {
                // Use normalized URL
                payload.value = url.href;
            }
            else {
                // Preserve the original input (trimmed)
                payload.value = trimmed;
            }
            return;
        }
        catch (_) {
            payload.issues.push({
                code: "invalid_format",
                format: "url",
                input: payload.value,
                inst,
                continue: !def.abort,
            });
        }
    };
});
const $ZodEmoji = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodEmoji", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.emoji());
    $ZodStringFormat.init(inst, def);
});
const $ZodNanoID = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodNanoID", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.nanoid);
    $ZodStringFormat.init(inst, def);
});
const $ZodCUID = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodCUID", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.cuid);
    $ZodStringFormat.init(inst, def);
});
const $ZodCUID2 = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodCUID2", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.cuid2);
    $ZodStringFormat.init(inst, def);
});
const $ZodULID = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodULID", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.ulid);
    $ZodStringFormat.init(inst, def);
});
const $ZodXID = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodXID", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.xid);
    $ZodStringFormat.init(inst, def);
});
const $ZodKSUID = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodKSUID", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.ksuid);
    $ZodStringFormat.init(inst, def);
});
const $ZodISODateTime = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodISODateTime", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.datetime(def));
    $ZodStringFormat.init(inst, def);
});
const $ZodISODate = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodISODate", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.date);
    $ZodStringFormat.init(inst, def);
});
const $ZodISOTime = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodISOTime", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.time(def));
    $ZodStringFormat.init(inst, def);
});
const $ZodISODuration = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodISODuration", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.duration);
    $ZodStringFormat.init(inst, def);
});
const $ZodIPv4 = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodIPv4", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.ipv4);
    $ZodStringFormat.init(inst, def);
    inst._zod.onattach.push((inst) => {
        const bag = inst._zod.bag;
        bag.format = `ipv4`;
    });
});
const $ZodIPv6 = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodIPv6", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.ipv6);
    $ZodStringFormat.init(inst, def);
    inst._zod.onattach.push((inst) => {
        const bag = inst._zod.bag;
        bag.format = `ipv6`;
    });
    inst._zod.check = (payload) => {
        try {
            // @ts-ignore
            new URL(`http://[${payload.value}]`);
            // return;
        }
        catch {
            payload.issues.push({
                code: "invalid_format",
                format: "ipv6",
                input: payload.value,
                inst,
                continue: !def.abort,
            });
        }
    };
});
const $ZodCIDRv4 = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodCIDRv4", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.cidrv4);
    $ZodStringFormat.init(inst, def);
});
const $ZodCIDRv6 = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodCIDRv6", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.cidrv6); // not used for validation
    $ZodStringFormat.init(inst, def);
    inst._zod.check = (payload) => {
        const [address, prefix] = payload.value.split("/");
        try {
            if (!prefix)
                throw new Error();
            const prefixNum = Number(prefix);
            if (`${prefixNum}` !== prefix)
                throw new Error();
            if (prefixNum < 0 || prefixNum > 128)
                throw new Error();
            // @ts-ignore
            new URL(`http://[${address}]`);
        }
        catch {
            payload.issues.push({
                code: "invalid_format",
                format: "cidrv6",
                input: payload.value,
                inst,
                continue: !def.abort,
            });
        }
    };
});
//////////////////////////////   ZodBase64   //////////////////////////////
function isValidBase64(data) {
    if (data === "")
        return true;
    if (data.length % 4 !== 0)
        return false;
    try {
        // @ts-ignore
        atob(data);
        return true;
    }
    catch {
        return false;
    }
}
const $ZodBase64 = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodBase64", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.base64);
    $ZodStringFormat.init(inst, def);
    inst._zod.onattach.push((inst) => {
        inst._zod.bag.contentEncoding = "base64";
    });
    inst._zod.check = (payload) => {
        if (isValidBase64(payload.value))
            return;
        payload.issues.push({
            code: "invalid_format",
            format: "base64",
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
//////////////////////////////   ZodBase64   //////////////////////////////
function isValidBase64URL(data) {
    if (!_regexes_js__WEBPACK_IMPORTED_MODULE_4__.base64url.test(data))
        return false;
    const base64 = data.replace(/[-_]/g, (c) => (c === "-" ? "+" : "/"));
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    return isValidBase64(padded);
}
const $ZodBase64URL = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodBase64URL", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.base64url);
    $ZodStringFormat.init(inst, def);
    inst._zod.onattach.push((inst) => {
        inst._zod.bag.contentEncoding = "base64url";
    });
    inst._zod.check = (payload) => {
        if (isValidBase64URL(payload.value))
            return;
        payload.issues.push({
            code: "invalid_format",
            format: "base64url",
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodE164 = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodE164", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.e164);
    $ZodStringFormat.init(inst, def);
});
//////////////////////////////   ZodJWT   //////////////////////////////
function isValidJWT(token, algorithm = null) {
    try {
        const tokensParts = token.split(".");
        if (tokensParts.length !== 3)
            return false;
        const [header] = tokensParts;
        if (!header)
            return false;
        // @ts-ignore
        const parsedHeader = JSON.parse(atob(header));
        if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT")
            return false;
        if (!parsedHeader.alg)
            return false;
        if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm))
            return false;
        return true;
    }
    catch {
        return false;
    }
}
const $ZodJWT = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodJWT", (inst, def) => {
    $ZodStringFormat.init(inst, def);
    inst._zod.check = (payload) => {
        if (isValidJWT(payload.value, def.alg))
            return;
        payload.issues.push({
            code: "invalid_format",
            format: "jwt",
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCustomStringFormat = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodCustomStringFormat", (inst, def) => {
    $ZodStringFormat.init(inst, def);
    inst._zod.check = (payload) => {
        if (def.fn(payload.value))
            return;
        payload.issues.push({
            code: "invalid_format",
            format: def.format,
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodNumber = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodNumber", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.pattern = inst._zod.bag.pattern ?? _regexes_js__WEBPACK_IMPORTED_MODULE_4__.number;
    inst._zod.parse = (payload, _ctx) => {
        if (def.coerce)
            try {
                payload.value = Number(payload.value);
            }
            catch (_) { }
        const input = payload.value;
        if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) {
            return payload;
        }
        const received = typeof input === "number"
            ? Number.isNaN(input)
                ? "NaN"
                : !Number.isFinite(input)
                    ? "Infinity"
                    : undefined
            : undefined;
        payload.issues.push({
            expected: "number",
            code: "invalid_type",
            input,
            inst,
            ...(received ? { received } : {}),
        });
        return payload;
    };
});
const $ZodNumberFormat = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodNumber", (inst, def) => {
    _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckNumberFormat.init(inst, def);
    $ZodNumber.init(inst, def); // no format checksp
});
const $ZodBoolean = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodBoolean", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.boolean;
    inst._zod.parse = (payload, _ctx) => {
        if (def.coerce)
            try {
                payload.value = Boolean(payload.value);
            }
            catch (_) { }
        const input = payload.value;
        if (typeof input === "boolean")
            return payload;
        payload.issues.push({
            expected: "boolean",
            code: "invalid_type",
            input,
            inst,
        });
        return payload;
    };
});
const $ZodBigInt = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodBigInt", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.bigint;
    inst._zod.parse = (payload, _ctx) => {
        if (def.coerce)
            try {
                payload.value = BigInt(payload.value);
            }
            catch (_) { }
        if (typeof payload.value === "bigint")
            return payload;
        payload.issues.push({
            expected: "bigint",
            code: "invalid_type",
            input: payload.value,
            inst,
        });
        return payload;
    };
});
const $ZodBigIntFormat = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodBigInt", (inst, def) => {
    _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckBigIntFormat.init(inst, def);
    $ZodBigInt.init(inst, def); // no format checks
});
const $ZodSymbol = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodSymbol", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (typeof input === "symbol")
            return payload;
        payload.issues.push({
            expected: "symbol",
            code: "invalid_type",
            input,
            inst,
        });
        return payload;
    };
});
const $ZodUndefined = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodUndefined", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.undefined;
    inst._zod.values = new Set([undefined]);
    inst._zod.optin = "optional";
    inst._zod.optout = "optional";
    inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (typeof input === "undefined")
            return payload;
        payload.issues.push({
            expected: "undefined",
            code: "invalid_type",
            input,
            inst,
        });
        return payload;
    };
});
const $ZodNull = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodNull", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__["null"];
    inst._zod.values = new Set([null]);
    inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (input === null)
            return payload;
        payload.issues.push({
            expected: "null",
            code: "invalid_type",
            input,
            inst,
        });
        return payload;
    };
});
const $ZodAny = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodAny", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload) => payload;
});
const $ZodUnknown = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodUnknown", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload) => payload;
});
const $ZodNever = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodNever", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, _ctx) => {
        payload.issues.push({
            expected: "never",
            code: "invalid_type",
            input: payload.value,
            inst,
        });
        return payload;
    };
});
const $ZodVoid = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodVoid", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (typeof input === "undefined")
            return payload;
        payload.issues.push({
            expected: "void",
            code: "invalid_type",
            input,
            inst,
        });
        return payload;
    };
});
const $ZodDate = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodDate", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, _ctx) => {
        if (def.coerce) {
            try {
                payload.value = new Date(payload.value);
            }
            catch (_err) { }
        }
        const input = payload.value;
        const isDate = input instanceof Date;
        const isValidDate = isDate && !Number.isNaN(input.getTime());
        if (isValidDate)
            return payload;
        payload.issues.push({
            expected: "date",
            code: "invalid_type",
            input,
            ...(isDate ? { received: "Invalid Date" } : {}),
            inst,
        });
        return payload;
    };
});
function handleArrayResult(result, final, index) {
    if (result.issues.length) {
        final.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(index, result.issues));
    }
    final.value[index] = result.value;
}
const $ZodArray = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodArray", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!Array.isArray(input)) {
            payload.issues.push({
                expected: "array",
                code: "invalid_type",
                input,
                inst,
            });
            return payload;
        }
        payload.value = Array(input.length);
        const proms = [];
        for (let i = 0; i < input.length; i++) {
            const item = input[i];
            const result = def.element._zod.run({
                value: item,
                issues: [],
            }, ctx);
            if (result instanceof Promise) {
                proms.push(result.then((result) => handleArrayResult(result, payload, i)));
            }
            else {
                handleArrayResult(result, payload, i);
            }
        }
        if (proms.length) {
            return Promise.all(proms).then(() => payload);
        }
        return payload; //handleArrayResultsAsync(parseResults, final);
    };
});
function handlePropertyResult(result, final, key, input) {
    if (result.issues.length) {
        final.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(key, result.issues));
    }
    if (result.value === undefined) {
        if (key in input) {
            final.value[key] = undefined;
        }
    }
    else {
        final.value[key] = result.value;
    }
}
function normalizeDef(def) {
    const keys = Object.keys(def.shape);
    for (const k of keys) {
        if (!def.shape[k]._zod.traits.has("$ZodType")) {
            throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
        }
    }
    const okeys = _util_js__WEBPACK_IMPORTED_MODULE_5__.optionalKeys(def.shape);
    return {
        ...def,
        keys,
        keySet: new Set(keys),
        numKeys: keys.length,
        optionalKeys: new Set(okeys),
    };
}
function handleCatchall(proms, input, payload, ctx, def, inst) {
    const unrecognized = [];
    // iterate over input keys
    const keySet = def.keySet;
    const _catchall = def.catchall._zod;
    const t = _catchall.def.type;
    for (const key of Object.keys(input)) {
        if (keySet.has(key))
            continue;
        if (t === "never") {
            unrecognized.push(key);
            continue;
        }
        const r = _catchall.run({ value: input[key], issues: [] }, ctx);
        if (r instanceof Promise) {
            proms.push(r.then((r) => handlePropertyResult(r, payload, key, input)));
        }
        else {
            handlePropertyResult(r, payload, key, input);
        }
    }
    if (unrecognized.length) {
        payload.issues.push({
            code: "unrecognized_keys",
            keys: unrecognized,
            input,
            inst,
        });
    }
    if (!proms.length)
        return payload;
    return Promise.all(proms).then(() => {
        return payload;
    });
}
const $ZodObject = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodObject", (inst, def) => {
    // requires cast because technically $ZodObject doesn't extend
    $ZodType.init(inst, def);
    const _normalized = _util_js__WEBPACK_IMPORTED_MODULE_5__.cached(() => normalizeDef(def));
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "propValues", () => {
        const shape = def.shape;
        const propValues = {};
        for (const key in shape) {
            const field = shape[key]._zod;
            if (field.values) {
                propValues[key] ?? (propValues[key] = new Set());
                for (const v of field.values)
                    propValues[key].add(v);
            }
        }
        return propValues;
    });
    const isObject = _util_js__WEBPACK_IMPORTED_MODULE_5__.isObject;
    const catchall = def.catchall;
    let value;
    inst._zod.parse = (payload, ctx) => {
        value ?? (value = _normalized.value);
        const input = payload.value;
        if (!isObject(input)) {
            payload.issues.push({
                expected: "object",
                code: "invalid_type",
                input,
                inst,
            });
            return payload;
        }
        payload.value = {};
        const proms = [];
        const shape = value.shape;
        for (const key of value.keys) {
            const el = shape[key];
            const r = el._zod.run({ value: input[key], issues: [] }, ctx);
            if (r instanceof Promise) {
                proms.push(r.then((r) => handlePropertyResult(r, payload, key, input)));
            }
            else {
                handlePropertyResult(r, payload, key, input);
            }
        }
        if (!catchall) {
            return proms.length ? Promise.all(proms).then(() => payload) : payload;
        }
        return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
    };
});
const $ZodObjectJIT = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodObjectJIT", (inst, def) => {
    // requires cast because technically $ZodObject doesn't extend
    $ZodObject.init(inst, def);
    const superParse = inst._zod.parse;
    const _normalized = _util_js__WEBPACK_IMPORTED_MODULE_5__.cached(() => normalizeDef(def));
    const generateFastpass = (shape) => {
        const doc = new _doc_js__WEBPACK_IMPORTED_MODULE_2__.Doc(["shape", "payload", "ctx"]);
        const normalized = _normalized.value;
        const parseStr = (key) => {
            const k = _util_js__WEBPACK_IMPORTED_MODULE_5__.esc(key);
            return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
        };
        doc.write(`const input = payload.value;`);
        const ids = Object.create(null);
        let counter = 0;
        for (const key of normalized.keys) {
            ids[key] = `key_${counter++}`;
        }
        // A: preserve key order {
        doc.write(`const newResult = {}`);
        for (const key of normalized.keys) {
            const id = ids[key];
            const k = _util_js__WEBPACK_IMPORTED_MODULE_5__.esc(key);
            doc.write(`const ${id} = ${parseStr(key)};`);
            doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
      `);
        }
        doc.write(`payload.value = newResult;`);
        doc.write(`return payload;`);
        const fn = doc.compile();
        return (payload, ctx) => fn(shape, payload, ctx);
    };
    let fastpass;
    const isObject = _util_js__WEBPACK_IMPORTED_MODULE_5__.isObject;
    const jit = !_core_js__WEBPACK_IMPORTED_MODULE_1__.globalConfig.jitless;
    const allowsEval = _util_js__WEBPACK_IMPORTED_MODULE_5__.allowsEval;
    const fastEnabled = jit && allowsEval.value; // && !def.catchall;
    const catchall = def.catchall;
    let value;
    inst._zod.parse = (payload, ctx) => {
        value ?? (value = _normalized.value);
        const input = payload.value;
        if (!isObject(input)) {
            payload.issues.push({
                expected: "object",
                code: "invalid_type",
                input,
                inst,
            });
            return payload;
        }
        if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
            // always synchronous
            if (!fastpass)
                fastpass = generateFastpass(def.shape);
            payload = fastpass(payload, ctx);
            if (!catchall)
                return payload;
            return handleCatchall([], input, payload, ctx, value, inst);
        }
        return superParse(payload, ctx);
    };
});
function handleUnionResults(results, final, inst, ctx) {
    for (const result of results) {
        if (result.issues.length === 0) {
            final.value = result.value;
            return final;
        }
    }
    const nonaborted = results.filter((r) => !_util_js__WEBPACK_IMPORTED_MODULE_5__.aborted(r));
    if (nonaborted.length === 1) {
        final.value = nonaborted[0].value;
        return nonaborted[0];
    }
    final.issues.push({
        code: "invalid_union",
        input: final.value,
        inst,
        errors: results.map((result) => result.issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_5__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_1__.config()))),
    });
    return final;
}
const $ZodUnion = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodUnion", (inst, def) => {
    $ZodType.init(inst, def);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : undefined);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : undefined);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => {
        if (def.options.every((o) => o._zod.values)) {
            return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
        }
        return undefined;
    });
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "pattern", () => {
        if (def.options.every((o) => o._zod.pattern)) {
            const patterns = def.options.map((o) => o._zod.pattern);
            return new RegExp(`^(${patterns.map((p) => _util_js__WEBPACK_IMPORTED_MODULE_5__.cleanRegex(p.source)).join("|")})$`);
        }
        return undefined;
    });
    const single = def.options.length === 1;
    const first = def.options[0]._zod.run;
    inst._zod.parse = (payload, ctx) => {
        if (single) {
            return first(payload, ctx);
        }
        let async = false;
        const results = [];
        for (const option of def.options) {
            const result = option._zod.run({
                value: payload.value,
                issues: [],
            }, ctx);
            if (result instanceof Promise) {
                results.push(result);
                async = true;
            }
            else {
                if (result.issues.length === 0)
                    return result;
                results.push(result);
            }
        }
        if (!async)
            return handleUnionResults(results, payload, inst, ctx);
        return Promise.all(results).then((results) => {
            return handleUnionResults(results, payload, inst, ctx);
        });
    };
});
const $ZodDiscriminatedUnion = 
/*@__PURE__*/
_core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodDiscriminatedUnion", (inst, def) => {
    $ZodUnion.init(inst, def);
    const _super = inst._zod.parse;
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "propValues", () => {
        const propValues = {};
        for (const option of def.options) {
            const pv = option._zod.propValues;
            if (!pv || Object.keys(pv).length === 0)
                throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
            for (const [k, v] of Object.entries(pv)) {
                if (!propValues[k])
                    propValues[k] = new Set();
                for (const val of v) {
                    propValues[k].add(val);
                }
            }
        }
        return propValues;
    });
    const disc = _util_js__WEBPACK_IMPORTED_MODULE_5__.cached(() => {
        const opts = def.options;
        const map = new Map();
        for (const o of opts) {
            const values = o._zod.propValues?.[def.discriminator];
            if (!values || values.size === 0)
                throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(o)}"`);
            for (const v of values) {
                if (map.has(v)) {
                    throw new Error(`Duplicate discriminator value "${String(v)}"`);
                }
                map.set(v, o);
            }
        }
        return map;
    });
    inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!_util_js__WEBPACK_IMPORTED_MODULE_5__.isObject(input)) {
            payload.issues.push({
                code: "invalid_type",
                expected: "object",
                input,
                inst,
            });
            return payload;
        }
        const opt = disc.value.get(input?.[def.discriminator]);
        if (opt) {
            return opt._zod.run(payload, ctx);
        }
        if (def.unionFallback) {
            return _super(payload, ctx);
        }
        // no matching discriminator
        payload.issues.push({
            code: "invalid_union",
            errors: [],
            note: "No matching discriminator",
            discriminator: def.discriminator,
            input,
            path: [def.discriminator],
            inst,
        });
        return payload;
    };
});
const $ZodIntersection = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodIntersection", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        const left = def.left._zod.run({ value: input, issues: [] }, ctx);
        const right = def.right._zod.run({ value: input, issues: [] }, ctx);
        const async = left instanceof Promise || right instanceof Promise;
        if (async) {
            return Promise.all([left, right]).then(([left, right]) => {
                return handleIntersectionResults(payload, left, right);
            });
        }
        return handleIntersectionResults(payload, left, right);
    };
});
function mergeValues(a, b) {
    // const aType = parse.t(a);
    // const bType = parse.t(b);
    if (a === b) {
        return { valid: true, data: a };
    }
    if (a instanceof Date && b instanceof Date && +a === +b) {
        return { valid: true, data: a };
    }
    if (_util_js__WEBPACK_IMPORTED_MODULE_5__.isPlainObject(a) && _util_js__WEBPACK_IMPORTED_MODULE_5__.isPlainObject(b)) {
        const bKeys = Object.keys(b);
        const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
        const newObj = { ...a, ...b };
        for (const key of sharedKeys) {
            const sharedValue = mergeValues(a[key], b[key]);
            if (!sharedValue.valid) {
                return {
                    valid: false,
                    mergeErrorPath: [key, ...sharedValue.mergeErrorPath],
                };
            }
            newObj[key] = sharedValue.data;
        }
        return { valid: true, data: newObj };
    }
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
            return { valid: false, mergeErrorPath: [] };
        }
        const newArray = [];
        for (let index = 0; index < a.length; index++) {
            const itemA = a[index];
            const itemB = b[index];
            const sharedValue = mergeValues(itemA, itemB);
            if (!sharedValue.valid) {
                return {
                    valid: false,
                    mergeErrorPath: [index, ...sharedValue.mergeErrorPath],
                };
            }
            newArray.push(sharedValue.data);
        }
        return { valid: true, data: newArray };
    }
    return { valid: false, mergeErrorPath: [] };
}
function handleIntersectionResults(result, left, right) {
    if (left.issues.length) {
        result.issues.push(...left.issues);
    }
    if (right.issues.length) {
        result.issues.push(...right.issues);
    }
    if (_util_js__WEBPACK_IMPORTED_MODULE_5__.aborted(result))
        return result;
    const merged = mergeValues(left.value, right.value);
    if (!merged.valid) {
        throw new Error(`Unmergable intersection. Error path: ` + `${JSON.stringify(merged.mergeErrorPath)}`);
    }
    result.value = merged.data;
    return result;
}
const $ZodTuple = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodTuple", (inst, def) => {
    $ZodType.init(inst, def);
    const items = def.items;
    const optStart = items.length - [...items].reverse().findIndex((item) => item._zod.optin !== "optional");
    inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!Array.isArray(input)) {
            payload.issues.push({
                input,
                inst,
                expected: "tuple",
                code: "invalid_type",
            });
            return payload;
        }
        payload.value = [];
        const proms = [];
        if (!def.rest) {
            const tooBig = input.length > items.length;
            const tooSmall = input.length < optStart - 1;
            if (tooBig || tooSmall) {
                payload.issues.push({
                    ...(tooBig ? { code: "too_big", maximum: items.length } : { code: "too_small", minimum: items.length }),
                    input,
                    inst,
                    origin: "array",
                });
                return payload;
            }
        }
        let i = -1;
        for (const item of items) {
            i++;
            if (i >= input.length)
                if (i >= optStart)
                    continue;
            const result = item._zod.run({
                value: input[i],
                issues: [],
            }, ctx);
            if (result instanceof Promise) {
                proms.push(result.then((result) => handleTupleResult(result, payload, i)));
            }
            else {
                handleTupleResult(result, payload, i);
            }
        }
        if (def.rest) {
            const rest = input.slice(items.length);
            for (const el of rest) {
                i++;
                const result = def.rest._zod.run({
                    value: el,
                    issues: [],
                }, ctx);
                if (result instanceof Promise) {
                    proms.push(result.then((result) => handleTupleResult(result, payload, i)));
                }
                else {
                    handleTupleResult(result, payload, i);
                }
            }
        }
        if (proms.length)
            return Promise.all(proms).then(() => payload);
        return payload;
    };
});
function handleTupleResult(result, final, index) {
    if (result.issues.length) {
        final.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(index, result.issues));
    }
    final.value[index] = result.value;
}
const $ZodRecord = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodRecord", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!_util_js__WEBPACK_IMPORTED_MODULE_5__.isPlainObject(input)) {
            payload.issues.push({
                expected: "record",
                code: "invalid_type",
                input,
                inst,
            });
            return payload;
        }
        const proms = [];
        if (def.keyType._zod.values) {
            const values = def.keyType._zod.values;
            payload.value = {};
            for (const key of values) {
                if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
                    const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
                    if (result instanceof Promise) {
                        proms.push(result.then((result) => {
                            if (result.issues.length) {
                                payload.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(key, result.issues));
                            }
                            payload.value[key] = result.value;
                        }));
                    }
                    else {
                        if (result.issues.length) {
                            payload.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(key, result.issues));
                        }
                        payload.value[key] = result.value;
                    }
                }
            }
            let unrecognized;
            for (const key in input) {
                if (!values.has(key)) {
                    unrecognized = unrecognized ?? [];
                    unrecognized.push(key);
                }
            }
            if (unrecognized && unrecognized.length > 0) {
                payload.issues.push({
                    code: "unrecognized_keys",
                    input,
                    inst,
                    keys: unrecognized,
                });
            }
        }
        else {
            payload.value = {};
            for (const key of Reflect.ownKeys(input)) {
                if (key === "__proto__")
                    continue;
                const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
                if (keyResult instanceof Promise) {
                    throw new Error("Async schemas not supported in object keys currently");
                }
                if (keyResult.issues.length) {
                    payload.issues.push({
                        code: "invalid_key",
                        origin: "record",
                        issues: keyResult.issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_5__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_1__.config())),
                        input: key,
                        path: [key],
                        inst,
                    });
                    payload.value[keyResult.value] = keyResult.value;
                    continue;
                }
                const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
                if (result instanceof Promise) {
                    proms.push(result.then((result) => {
                        if (result.issues.length) {
                            payload.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(key, result.issues));
                        }
                        payload.value[keyResult.value] = result.value;
                    }));
                }
                else {
                    if (result.issues.length) {
                        payload.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(key, result.issues));
                    }
                    payload.value[keyResult.value] = result.value;
                }
            }
        }
        if (proms.length) {
            return Promise.all(proms).then(() => payload);
        }
        return payload;
    };
});
const $ZodMap = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodMap", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!(input instanceof Map)) {
            payload.issues.push({
                expected: "map",
                code: "invalid_type",
                input,
                inst,
            });
            return payload;
        }
        const proms = [];
        payload.value = new Map();
        for (const [key, value] of input) {
            const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
            const valueResult = def.valueType._zod.run({ value: value, issues: [] }, ctx);
            if (keyResult instanceof Promise || valueResult instanceof Promise) {
                proms.push(Promise.all([keyResult, valueResult]).then(([keyResult, valueResult]) => {
                    handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
                }));
            }
            else {
                handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
            }
        }
        if (proms.length)
            return Promise.all(proms).then(() => payload);
        return payload;
    };
});
function handleMapResult(keyResult, valueResult, final, key, input, inst, ctx) {
    if (keyResult.issues.length) {
        if (_util_js__WEBPACK_IMPORTED_MODULE_5__.propertyKeyTypes.has(typeof key)) {
            final.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(key, keyResult.issues));
        }
        else {
            final.issues.push({
                code: "invalid_key",
                origin: "map",
                input,
                inst,
                issues: keyResult.issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_5__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_1__.config())),
            });
        }
    }
    if (valueResult.issues.length) {
        if (_util_js__WEBPACK_IMPORTED_MODULE_5__.propertyKeyTypes.has(typeof key)) {
            final.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(key, valueResult.issues));
        }
        else {
            final.issues.push({
                origin: "map",
                code: "invalid_element",
                input,
                inst,
                key: key,
                issues: valueResult.issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_5__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_1__.config())),
            });
        }
    }
    final.value.set(keyResult.value, valueResult.value);
}
const $ZodSet = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodSet", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!(input instanceof Set)) {
            payload.issues.push({
                input,
                inst,
                expected: "set",
                code: "invalid_type",
            });
            return payload;
        }
        const proms = [];
        payload.value = new Set();
        for (const item of input) {
            const result = def.valueType._zod.run({ value: item, issues: [] }, ctx);
            if (result instanceof Promise) {
                proms.push(result.then((result) => handleSetResult(result, payload)));
            }
            else
                handleSetResult(result, payload);
        }
        if (proms.length)
            return Promise.all(proms).then(() => payload);
        return payload;
    };
});
function handleSetResult(result, final) {
    if (result.issues.length) {
        final.issues.push(...result.issues);
    }
    final.value.add(result.value);
}
const $ZodEnum = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodEnum", (inst, def) => {
    $ZodType.init(inst, def);
    const values = _util_js__WEBPACK_IMPORTED_MODULE_5__.getEnumValues(def.entries);
    const valuesSet = new Set(values);
    inst._zod.values = valuesSet;
    inst._zod.pattern = new RegExp(`^(${values
        .filter((k) => _util_js__WEBPACK_IMPORTED_MODULE_5__.propertyKeyTypes.has(typeof k))
        .map((o) => (typeof o === "string" ? _util_js__WEBPACK_IMPORTED_MODULE_5__.escapeRegex(o) : o.toString()))
        .join("|")})$`);
    inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (valuesSet.has(input)) {
            return payload;
        }
        payload.issues.push({
            code: "invalid_value",
            values,
            input,
            inst,
        });
        return payload;
    };
});
const $ZodLiteral = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodLiteral", (inst, def) => {
    $ZodType.init(inst, def);
    if (def.values.length === 0) {
        throw new Error("Cannot create literal schema with no valid values");
    }
    inst._zod.values = new Set(def.values);
    inst._zod.pattern = new RegExp(`^(${def.values
        .map((o) => (typeof o === "string" ? _util_js__WEBPACK_IMPORTED_MODULE_5__.escapeRegex(o) : o ? _util_js__WEBPACK_IMPORTED_MODULE_5__.escapeRegex(o.toString()) : String(o)))
        .join("|")})$`);
    inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (inst._zod.values.has(input)) {
            return payload;
        }
        payload.issues.push({
            code: "invalid_value",
            values: def.values,
            input,
            inst,
        });
        return payload;
    };
});
const $ZodFile = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodFile", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        // @ts-ignore
        if (input instanceof File)
            return payload;
        payload.issues.push({
            expected: "file",
            code: "invalid_type",
            input,
            inst,
        });
        return payload;
    };
});
const $ZodTransform = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodTransform", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
            throw new _core_js__WEBPACK_IMPORTED_MODULE_1__.$ZodEncodeError(inst.constructor.name);
        }
        const _out = def.transform(payload.value, payload);
        if (ctx.async) {
            const output = _out instanceof Promise ? _out : Promise.resolve(_out);
            return output.then((output) => {
                payload.value = output;
                return payload;
            });
        }
        if (_out instanceof Promise) {
            throw new _core_js__WEBPACK_IMPORTED_MODULE_1__.$ZodAsyncError();
        }
        payload.value = _out;
        return payload;
    };
});
function handleOptionalResult(result, input) {
    if (result.issues.length && input === undefined) {
        return { issues: [], value: undefined };
    }
    return result;
}
const $ZodOptional = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodOptional", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.optin = "optional";
    inst._zod.optout = "optional";
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => {
        return def.innerType._zod.values ? new Set([...def.innerType._zod.values, undefined]) : undefined;
    });
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "pattern", () => {
        const pattern = def.innerType._zod.pattern;
        return pattern ? new RegExp(`^(${_util_js__WEBPACK_IMPORTED_MODULE_5__.cleanRegex(pattern.source)})?$`) : undefined;
    });
    inst._zod.parse = (payload, ctx) => {
        if (def.innerType._zod.optin === "optional") {
            const result = def.innerType._zod.run(payload, ctx);
            if (result instanceof Promise)
                return result.then((r) => handleOptionalResult(r, payload.value));
            return handleOptionalResult(result, payload.value);
        }
        if (payload.value === undefined) {
            return payload;
        }
        return def.innerType._zod.run(payload, ctx);
    };
});
const $ZodNullable = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodNullable", (inst, def) => {
    $ZodType.init(inst, def);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "pattern", () => {
        const pattern = def.innerType._zod.pattern;
        return pattern ? new RegExp(`^(${_util_js__WEBPACK_IMPORTED_MODULE_5__.cleanRegex(pattern.source)}|null)$`) : undefined;
    });
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => {
        return def.innerType._zod.values ? new Set([...def.innerType._zod.values, null]) : undefined;
    });
    inst._zod.parse = (payload, ctx) => {
        // Forward direction (decode): allow null to pass through
        if (payload.value === null)
            return payload;
        return def.innerType._zod.run(payload, ctx);
    };
});
const $ZodDefault = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodDefault", (inst, def) => {
    $ZodType.init(inst, def);
    // inst._zod.qin = "true";
    inst._zod.optin = "optional";
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
    inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
            return def.innerType._zod.run(payload, ctx);
        }
        // Forward direction (decode): apply defaults for undefined input
        if (payload.value === undefined) {
            payload.value = def.defaultValue;
            /**
             * $ZodDefault returns the default value immediately in forward direction.
             * It doesn't pass the default value into the validator ("prefault"). There's no reason to pass the default value through validation. The validity of the default is enforced by TypeScript statically. Otherwise, it's the responsibility of the user to ensure the default is valid. In the case of pipes with divergent in/out types, you can specify the default on the `in` schema of your ZodPipe to set a "prefault" for the pipe.   */
            return payload;
        }
        // Forward direction: continue with default handling
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
            return result.then((result) => handleDefaultResult(result, def));
        }
        return handleDefaultResult(result, def);
    };
});
function handleDefaultResult(payload, def) {
    if (payload.value === undefined) {
        payload.value = def.defaultValue;
    }
    return payload;
}
const $ZodPrefault = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodPrefault", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.optin = "optional";
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
    inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
            return def.innerType._zod.run(payload, ctx);
        }
        // Forward direction (decode): apply prefault for undefined input
        if (payload.value === undefined) {
            payload.value = def.defaultValue;
        }
        return def.innerType._zod.run(payload, ctx);
    };
});
const $ZodNonOptional = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodNonOptional", (inst, def) => {
    $ZodType.init(inst, def);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => {
        const v = def.innerType._zod.values;
        return v ? new Set([...v].filter((x) => x !== undefined)) : undefined;
    });
    inst._zod.parse = (payload, ctx) => {
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
            return result.then((result) => handleNonOptionalResult(result, inst));
        }
        return handleNonOptionalResult(result, inst);
    };
});
function handleNonOptionalResult(payload, inst) {
    if (!payload.issues.length && payload.value === undefined) {
        payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: payload.value,
            inst,
        });
    }
    return payload;
}
const $ZodSuccess = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodSuccess", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
            throw new _core_js__WEBPACK_IMPORTED_MODULE_1__.$ZodEncodeError("ZodSuccess");
        }
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
            return result.then((result) => {
                payload.value = result.issues.length === 0;
                return payload;
            });
        }
        payload.value = result.issues.length === 0;
        return payload;
    };
});
const $ZodCatch = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodCatch", (inst, def) => {
    $ZodType.init(inst, def);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
    inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
            return def.innerType._zod.run(payload, ctx);
        }
        // Forward direction (decode): apply catch logic
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
            return result.then((result) => {
                payload.value = result.value;
                if (result.issues.length) {
                    payload.value = def.catchValue({
                        ...payload,
                        error: {
                            issues: result.issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_5__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_1__.config())),
                        },
                        input: payload.value,
                    });
                    payload.issues = [];
                }
                return payload;
            });
        }
        payload.value = result.value;
        if (result.issues.length) {
            payload.value = def.catchValue({
                ...payload,
                error: {
                    issues: result.issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_5__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_1__.config())),
                },
                input: payload.value,
            });
            payload.issues = [];
        }
        return payload;
    };
});
const $ZodNaN = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodNaN", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, _ctx) => {
        if (typeof payload.value !== "number" || !Number.isNaN(payload.value)) {
            payload.issues.push({
                input: payload.value,
                inst,
                expected: "nan",
                code: "invalid_type",
            });
            return payload;
        }
        return payload;
    };
});
const $ZodPipe = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodPipe", (inst, def) => {
    $ZodType.init(inst, def);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => def.in._zod.values);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optin", () => def.in._zod.optin);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optout", () => def.out._zod.optout);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
    inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
            const right = def.out._zod.run(payload, ctx);
            if (right instanceof Promise) {
                return right.then((right) => handlePipeResult(right, def.in, ctx));
            }
            return handlePipeResult(right, def.in, ctx);
        }
        const left = def.in._zod.run(payload, ctx);
        if (left instanceof Promise) {
            return left.then((left) => handlePipeResult(left, def.out, ctx));
        }
        return handlePipeResult(left, def.out, ctx);
    };
});
function handlePipeResult(left, next, ctx) {
    if (left.issues.length) {
        // prevent further checks
        left.aborted = true;
        return left;
    }
    return next._zod.run({ value: left.value, issues: left.issues }, ctx);
}
const $ZodCodec = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodCodec", (inst, def) => {
    $ZodType.init(inst, def);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => def.in._zod.values);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optin", () => def.in._zod.optin);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optout", () => def.out._zod.optout);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
    inst._zod.parse = (payload, ctx) => {
        const direction = ctx.direction || "forward";
        if (direction === "forward") {
            const left = def.in._zod.run(payload, ctx);
            if (left instanceof Promise) {
                return left.then((left) => handleCodecAResult(left, def, ctx));
            }
            return handleCodecAResult(left, def, ctx);
        }
        else {
            const right = def.out._zod.run(payload, ctx);
            if (right instanceof Promise) {
                return right.then((right) => handleCodecAResult(right, def, ctx));
            }
            return handleCodecAResult(right, def, ctx);
        }
    };
});
function handleCodecAResult(result, def, ctx) {
    if (result.issues.length) {
        // prevent further checks
        result.aborted = true;
        return result;
    }
    const direction = ctx.direction || "forward";
    if (direction === "forward") {
        const transformed = def.transform(result.value, result);
        if (transformed instanceof Promise) {
            return transformed.then((value) => handleCodecTxResult(result, value, def.out, ctx));
        }
        return handleCodecTxResult(result, transformed, def.out, ctx);
    }
    else {
        const transformed = def.reverseTransform(result.value, result);
        if (transformed instanceof Promise) {
            return transformed.then((value) => handleCodecTxResult(result, value, def.in, ctx));
        }
        return handleCodecTxResult(result, transformed, def.in, ctx);
    }
}
function handleCodecTxResult(left, value, nextSchema, ctx) {
    // Check if transform added any issues
    if (left.issues.length) {
        left.aborted = true;
        return left;
    }
    return nextSchema._zod.run({ value, issues: left.issues }, ctx);
}
const $ZodReadonly = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodReadonly", (inst, def) => {
    $ZodType.init(inst, def);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
    inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
            return def.innerType._zod.run(payload, ctx);
        }
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
            return result.then(handleReadonlyResult);
        }
        return handleReadonlyResult(result);
    };
});
function handleReadonlyResult(payload) {
    payload.value = Object.freeze(payload.value);
    return payload;
}
const $ZodTemplateLiteral = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodTemplateLiteral", (inst, def) => {
    $ZodType.init(inst, def);
    const regexParts = [];
    for (const part of def.parts) {
        if (typeof part === "object" && part !== null) {
            // is Zod schema
            if (!part._zod.pattern) {
                // if (!source)
                throw new Error(`Invalid template literal part, no pattern found: ${[...part._zod.traits].shift()}`);
            }
            const source = part._zod.pattern instanceof RegExp ? part._zod.pattern.source : part._zod.pattern;
            if (!source)
                throw new Error(`Invalid template literal part: ${part._zod.traits}`);
            const start = source.startsWith("^") ? 1 : 0;
            const end = source.endsWith("$") ? source.length - 1 : source.length;
            regexParts.push(source.slice(start, end));
        }
        else if (part === null || _util_js__WEBPACK_IMPORTED_MODULE_5__.primitiveTypes.has(typeof part)) {
            regexParts.push(_util_js__WEBPACK_IMPORTED_MODULE_5__.escapeRegex(`${part}`));
        }
        else {
            throw new Error(`Invalid template literal part: ${part}`);
        }
    }
    inst._zod.pattern = new RegExp(`^${regexParts.join("")}$`);
    inst._zod.parse = (payload, _ctx) => {
        if (typeof payload.value !== "string") {
            payload.issues.push({
                input: payload.value,
                inst,
                expected: "template_literal",
                code: "invalid_type",
            });
            return payload;
        }
        inst._zod.pattern.lastIndex = 0;
        if (!inst._zod.pattern.test(payload.value)) {
            payload.issues.push({
                input: payload.value,
                inst,
                code: "invalid_format",
                format: def.format ?? "template_literal",
                pattern: inst._zod.pattern.source,
            });
            return payload;
        }
        return payload;
    };
});
const $ZodFunction = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodFunction", (inst, def) => {
    $ZodType.init(inst, def);
    inst._def = def;
    inst._zod.def = def;
    inst.implement = (func) => {
        if (typeof func !== "function") {
            throw new Error("implement() must be called with a function");
        }
        return function (...args) {
            const parsedArgs = inst._def.input ? (0,_parse_js__WEBPACK_IMPORTED_MODULE_3__.parse)(inst._def.input, args) : args;
            const result = Reflect.apply(func, this, parsedArgs);
            if (inst._def.output) {
                return (0,_parse_js__WEBPACK_IMPORTED_MODULE_3__.parse)(inst._def.output, result);
            }
            return result;
        };
    };
    inst.implementAsync = (func) => {
        if (typeof func !== "function") {
            throw new Error("implementAsync() must be called with a function");
        }
        return async function (...args) {
            const parsedArgs = inst._def.input ? await (0,_parse_js__WEBPACK_IMPORTED_MODULE_3__.parseAsync)(inst._def.input, args) : args;
            const result = await Reflect.apply(func, this, parsedArgs);
            if (inst._def.output) {
                return await (0,_parse_js__WEBPACK_IMPORTED_MODULE_3__.parseAsync)(inst._def.output, result);
            }
            return result;
        };
    };
    inst._zod.parse = (payload, _ctx) => {
        if (typeof payload.value !== "function") {
            payload.issues.push({
                code: "invalid_type",
                expected: "function",
                input: payload.value,
                inst,
            });
            return payload;
        }
        // Check if output is a promise type to determine if we should use async implementation
        const hasPromiseOutput = inst._def.output && inst._def.output._zod.def.type === "promise";
        if (hasPromiseOutput) {
            payload.value = inst.implementAsync(payload.value);
        }
        else {
            payload.value = inst.implement(payload.value);
        }
        return payload;
    };
    inst.input = (...args) => {
        const F = inst.constructor;
        if (Array.isArray(args[0])) {
            return new F({
                type: "function",
                input: new $ZodTuple({
                    type: "tuple",
                    items: args[0],
                    rest: args[1],
                }),
                output: inst._def.output,
            });
        }
        return new F({
            type: "function",
            input: args[0],
            output: inst._def.output,
        });
    };
    inst.output = (output) => {
        const F = inst.constructor;
        return new F({
            type: "function",
            input: inst._def.input,
            output,
        });
    };
    return inst;
});
const $ZodPromise = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodPromise", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, ctx) => {
        return Promise.resolve(payload.value).then((inner) => def.innerType._zod.run({ value: inner, issues: [] }, ctx));
    };
});
const $ZodLazy = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodLazy", (inst, def) => {
    $ZodType.init(inst, def);
    // let _innerType!: any;
    // util.defineLazy(def, "getter", () => {
    //   if (!_innerType) {
    //     _innerType = def.getter();
    //   }
    //   return () => _innerType;
    // });
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "innerType", () => def.getter());
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "pattern", () => inst._zod.innerType._zod.pattern);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "propValues", () => inst._zod.innerType._zod.propValues);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optin", () => inst._zod.innerType._zod.optin ?? undefined);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optout", () => inst._zod.innerType._zod.optout ?? undefined);
    inst._zod.parse = (payload, ctx) => {
        const inner = inst._zod.innerType;
        return inner._zod.run(payload, ctx);
    };
});
const $ZodCustom = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodCustom", (inst, def) => {
    _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheck.init(inst, def);
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, _) => {
        return payload;
    };
    inst._zod.check = (payload) => {
        const input = payload.value;
        const r = def.fn(input);
        if (r instanceof Promise) {
            return r.then((r) => handleRefineResult(r, payload, input, inst));
        }
        handleRefineResult(r, payload, input, inst);
        return;
    };
});
function handleRefineResult(result, payload, input, inst) {
    if (!result) {
        const _iss = {
            code: "custom",
            input,
            inst, // incorporates params.error into issue reporting
            path: [...(inst._zod.def.path ?? [])], // incorporates params.error into issue reporting
            continue: !inst._zod.def.abort,
            // params: inst._zod.def.params,
        };
        if (inst._zod.def.params)
            _iss.params = inst._zod.def.params;
        payload.issues.push(_util_js__WEBPACK_IMPORTED_MODULE_5__.issue(_iss));
    }
}


/***/ }),

/***/ 2308:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZodAny: () => (/* binding */ ZodAny),
/* harmony export */   ZodArray: () => (/* binding */ ZodArray),
/* harmony export */   ZodBase64: () => (/* binding */ ZodBase64),
/* harmony export */   ZodBase64URL: () => (/* binding */ ZodBase64URL),
/* harmony export */   ZodBigInt: () => (/* binding */ ZodBigInt),
/* harmony export */   ZodBigIntFormat: () => (/* binding */ ZodBigIntFormat),
/* harmony export */   ZodBoolean: () => (/* binding */ ZodBoolean),
/* harmony export */   ZodCIDRv4: () => (/* binding */ ZodCIDRv4),
/* harmony export */   ZodCIDRv6: () => (/* binding */ ZodCIDRv6),
/* harmony export */   ZodCUID: () => (/* binding */ ZodCUID),
/* harmony export */   ZodCUID2: () => (/* binding */ ZodCUID2),
/* harmony export */   ZodCatch: () => (/* binding */ ZodCatch),
/* harmony export */   ZodCodec: () => (/* binding */ ZodCodec),
/* harmony export */   ZodCustom: () => (/* binding */ ZodCustom),
/* harmony export */   ZodCustomStringFormat: () => (/* binding */ ZodCustomStringFormat),
/* harmony export */   ZodDate: () => (/* binding */ ZodDate),
/* harmony export */   ZodDefault: () => (/* binding */ ZodDefault),
/* harmony export */   ZodDiscriminatedUnion: () => (/* binding */ ZodDiscriminatedUnion),
/* harmony export */   ZodE164: () => (/* binding */ ZodE164),
/* harmony export */   ZodEmail: () => (/* binding */ ZodEmail),
/* harmony export */   ZodEmoji: () => (/* binding */ ZodEmoji),
/* harmony export */   ZodEnum: () => (/* binding */ ZodEnum),
/* harmony export */   ZodFile: () => (/* binding */ ZodFile),
/* harmony export */   ZodFunction: () => (/* binding */ ZodFunction),
/* harmony export */   ZodGUID: () => (/* binding */ ZodGUID),
/* harmony export */   ZodIPv4: () => (/* binding */ ZodIPv4),
/* harmony export */   ZodIPv6: () => (/* binding */ ZodIPv6),
/* harmony export */   ZodIntersection: () => (/* binding */ ZodIntersection),
/* harmony export */   ZodJWT: () => (/* binding */ ZodJWT),
/* harmony export */   ZodKSUID: () => (/* binding */ ZodKSUID),
/* harmony export */   ZodLazy: () => (/* binding */ ZodLazy),
/* harmony export */   ZodLiteral: () => (/* binding */ ZodLiteral),
/* harmony export */   ZodMap: () => (/* binding */ ZodMap),
/* harmony export */   ZodNaN: () => (/* binding */ ZodNaN),
/* harmony export */   ZodNanoID: () => (/* binding */ ZodNanoID),
/* harmony export */   ZodNever: () => (/* binding */ ZodNever),
/* harmony export */   ZodNonOptional: () => (/* binding */ ZodNonOptional),
/* harmony export */   ZodNull: () => (/* binding */ ZodNull),
/* harmony export */   ZodNullable: () => (/* binding */ ZodNullable),
/* harmony export */   ZodNumber: () => (/* binding */ ZodNumber),
/* harmony export */   ZodNumberFormat: () => (/* binding */ ZodNumberFormat),
/* harmony export */   ZodObject: () => (/* binding */ ZodObject),
/* harmony export */   ZodOptional: () => (/* binding */ ZodOptional),
/* harmony export */   ZodPipe: () => (/* binding */ ZodPipe),
/* harmony export */   ZodPrefault: () => (/* binding */ ZodPrefault),
/* harmony export */   ZodPromise: () => (/* binding */ ZodPromise),
/* harmony export */   ZodReadonly: () => (/* binding */ ZodReadonly),
/* harmony export */   ZodRecord: () => (/* binding */ ZodRecord),
/* harmony export */   ZodSet: () => (/* binding */ ZodSet),
/* harmony export */   ZodString: () => (/* binding */ ZodString),
/* harmony export */   ZodStringFormat: () => (/* binding */ ZodStringFormat),
/* harmony export */   ZodSuccess: () => (/* binding */ ZodSuccess),
/* harmony export */   ZodSymbol: () => (/* binding */ ZodSymbol),
/* harmony export */   ZodTemplateLiteral: () => (/* binding */ ZodTemplateLiteral),
/* harmony export */   ZodTransform: () => (/* binding */ ZodTransform),
/* harmony export */   ZodTuple: () => (/* binding */ ZodTuple),
/* harmony export */   ZodType: () => (/* binding */ ZodType),
/* harmony export */   ZodULID: () => (/* binding */ ZodULID),
/* harmony export */   ZodURL: () => (/* binding */ ZodURL),
/* harmony export */   ZodUUID: () => (/* binding */ ZodUUID),
/* harmony export */   ZodUndefined: () => (/* binding */ ZodUndefined),
/* harmony export */   ZodUnion: () => (/* binding */ ZodUnion),
/* harmony export */   ZodUnknown: () => (/* binding */ ZodUnknown),
/* harmony export */   ZodVoid: () => (/* binding */ ZodVoid),
/* harmony export */   ZodXID: () => (/* binding */ ZodXID),
/* harmony export */   _ZodString: () => (/* binding */ _ZodString),
/* harmony export */   _default: () => (/* binding */ _default),
/* harmony export */   _function: () => (/* binding */ _function),
/* harmony export */   any: () => (/* binding */ any),
/* harmony export */   array: () => (/* binding */ array),
/* harmony export */   base64: () => (/* binding */ base64),
/* harmony export */   base64url: () => (/* binding */ base64url),
/* harmony export */   bigint: () => (/* binding */ bigint),
/* harmony export */   boolean: () => (/* binding */ boolean),
/* harmony export */   "catch": () => (/* binding */ _catch),
/* harmony export */   check: () => (/* binding */ check),
/* harmony export */   cidrv4: () => (/* binding */ cidrv4),
/* harmony export */   cidrv6: () => (/* binding */ cidrv6),
/* harmony export */   codec: () => (/* binding */ codec),
/* harmony export */   cuid: () => (/* binding */ cuid),
/* harmony export */   cuid2: () => (/* binding */ cuid2),
/* harmony export */   custom: () => (/* binding */ custom),
/* harmony export */   date: () => (/* binding */ date),
/* harmony export */   discriminatedUnion: () => (/* binding */ discriminatedUnion),
/* harmony export */   e164: () => (/* binding */ e164),
/* harmony export */   email: () => (/* binding */ email),
/* harmony export */   emoji: () => (/* binding */ emoji),
/* harmony export */   "enum": () => (/* binding */ _enum),
/* harmony export */   file: () => (/* binding */ file),
/* harmony export */   float32: () => (/* binding */ float32),
/* harmony export */   float64: () => (/* binding */ float64),
/* harmony export */   "function": () => (/* binding */ _function),
/* harmony export */   guid: () => (/* binding */ guid),
/* harmony export */   hash: () => (/* binding */ hash),
/* harmony export */   hex: () => (/* binding */ hex),
/* harmony export */   hostname: () => (/* binding */ hostname),
/* harmony export */   httpUrl: () => (/* binding */ httpUrl),
/* harmony export */   "instanceof": () => (/* binding */ _instanceof),
/* harmony export */   int: () => (/* binding */ int),
/* harmony export */   int32: () => (/* binding */ int32),
/* harmony export */   int64: () => (/* binding */ int64),
/* harmony export */   intersection: () => (/* binding */ intersection),
/* harmony export */   ipv4: () => (/* binding */ ipv4),
/* harmony export */   ipv6: () => (/* binding */ ipv6),
/* harmony export */   json: () => (/* binding */ json),
/* harmony export */   jwt: () => (/* binding */ jwt),
/* harmony export */   keyof: () => (/* binding */ keyof),
/* harmony export */   ksuid: () => (/* binding */ ksuid),
/* harmony export */   lazy: () => (/* binding */ lazy),
/* harmony export */   literal: () => (/* binding */ literal),
/* harmony export */   looseObject: () => (/* binding */ looseObject),
/* harmony export */   map: () => (/* binding */ map),
/* harmony export */   nan: () => (/* binding */ nan),
/* harmony export */   nanoid: () => (/* binding */ nanoid),
/* harmony export */   nativeEnum: () => (/* binding */ nativeEnum),
/* harmony export */   never: () => (/* binding */ never),
/* harmony export */   nonoptional: () => (/* binding */ nonoptional),
/* harmony export */   "null": () => (/* binding */ _null),
/* harmony export */   nullable: () => (/* binding */ nullable),
/* harmony export */   nullish: () => (/* binding */ nullish),
/* harmony export */   number: () => (/* binding */ number),
/* harmony export */   object: () => (/* binding */ object),
/* harmony export */   optional: () => (/* binding */ optional),
/* harmony export */   partialRecord: () => (/* binding */ partialRecord),
/* harmony export */   pipe: () => (/* binding */ pipe),
/* harmony export */   prefault: () => (/* binding */ prefault),
/* harmony export */   preprocess: () => (/* binding */ preprocess),
/* harmony export */   promise: () => (/* binding */ promise),
/* harmony export */   readonly: () => (/* binding */ readonly),
/* harmony export */   record: () => (/* binding */ record),
/* harmony export */   refine: () => (/* binding */ refine),
/* harmony export */   set: () => (/* binding */ set),
/* harmony export */   strictObject: () => (/* binding */ strictObject),
/* harmony export */   string: () => (/* binding */ string),
/* harmony export */   stringFormat: () => (/* binding */ stringFormat),
/* harmony export */   stringbool: () => (/* binding */ stringbool),
/* harmony export */   success: () => (/* binding */ success),
/* harmony export */   superRefine: () => (/* binding */ superRefine),
/* harmony export */   symbol: () => (/* binding */ symbol),
/* harmony export */   templateLiteral: () => (/* binding */ templateLiteral),
/* harmony export */   transform: () => (/* binding */ transform),
/* harmony export */   tuple: () => (/* binding */ tuple),
/* harmony export */   uint32: () => (/* binding */ uint32),
/* harmony export */   uint64: () => (/* binding */ uint64),
/* harmony export */   ulid: () => (/* binding */ ulid),
/* harmony export */   undefined: () => (/* binding */ _undefined),
/* harmony export */   union: () => (/* binding */ union),
/* harmony export */   unknown: () => (/* binding */ unknown),
/* harmony export */   url: () => (/* binding */ url),
/* harmony export */   uuid: () => (/* binding */ uuid),
/* harmony export */   uuidv4: () => (/* binding */ uuidv4),
/* harmony export */   uuidv6: () => (/* binding */ uuidv6),
/* harmony export */   uuidv7: () => (/* binding */ uuidv7),
/* harmony export */   "void": () => (/* binding */ _void),
/* harmony export */   xid: () => (/* binding */ xid)
/* harmony export */ });
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3259);
/* harmony import */ var _checks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9067);
/* harmony import */ var _iso_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5257);
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7376);





const ZodType = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodType", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodType.init(inst, def);
    inst.def = def;
    inst.type = def.type;
    Object.defineProperty(inst, "_def", { value: def });
    // base methods
    inst.check = (...checks) => {
        return inst.clone({
            ...def,
            checks: [
                ...(def.checks ?? []),
                ...checks.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch),
            ],
        }
        // { parent: true }
        );
    };
    inst.clone = (def, params) => _core_index_js__WEBPACK_IMPORTED_MODULE_0__.clone(inst, def, params);
    inst.brand = () => inst;
    inst.register = ((reg, meta) => {
        reg.add(inst, meta);
        return inst;
    });
    // parsing
    inst.parse = (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_3__.parse(inst, data, params, { callee: inst.parse });
    inst.safeParse = (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_3__.safeParse(inst, data, params);
    inst.parseAsync = async (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_3__.parseAsync(inst, data, params, { callee: inst.parseAsync });
    inst.safeParseAsync = async (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_3__.safeParseAsync(inst, data, params);
    inst.spa = inst.safeParseAsync;
    // encoding/decoding
    inst.encode = (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_3__.encode(inst, data, params);
    inst.decode = (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_3__.decode(inst, data, params);
    inst.encodeAsync = async (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_3__.encodeAsync(inst, data, params);
    inst.decodeAsync = async (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_3__.decodeAsync(inst, data, params);
    inst.safeEncode = (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_3__.safeEncode(inst, data, params);
    inst.safeDecode = (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_3__.safeDecode(inst, data, params);
    inst.safeEncodeAsync = async (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_3__.safeEncodeAsync(inst, data, params);
    inst.safeDecodeAsync = async (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_3__.safeDecodeAsync(inst, data, params);
    // refinements
    inst.refine = (check, params) => inst.check(refine(check, params));
    inst.superRefine = (refinement) => inst.check(superRefine(refinement));
    inst.overwrite = (fn) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.overwrite(fn));
    // wrappers
    inst.optional = () => optional(inst);
    inst.nullable = () => nullable(inst);
    inst.nullish = () => optional(nullable(inst));
    inst.nonoptional = (params) => nonoptional(inst, params);
    inst.array = () => array(inst);
    inst.or = (arg) => union([inst, arg]);
    inst.and = (arg) => intersection(inst, arg);
    inst.transform = (tx) => pipe(inst, transform(tx));
    inst.default = (def) => _default(inst, def);
    inst.prefault = (def) => prefault(inst, def);
    // inst.coalesce = (def, params) => coalesce(inst, def, params);
    inst.catch = (params) => _catch(inst, params);
    inst.pipe = (target) => pipe(inst, target);
    inst.readonly = () => readonly(inst);
    // meta
    inst.describe = (description) => {
        const cl = inst.clone();
        _core_index_js__WEBPACK_IMPORTED_MODULE_0__.globalRegistry.add(cl, { description });
        return cl;
    };
    Object.defineProperty(inst, "description", {
        get() {
            return _core_index_js__WEBPACK_IMPORTED_MODULE_0__.globalRegistry.get(inst)?.description;
        },
        configurable: true,
    });
    inst.meta = (...args) => {
        if (args.length === 0) {
            return _core_index_js__WEBPACK_IMPORTED_MODULE_0__.globalRegistry.get(inst);
        }
        const cl = inst.clone();
        _core_index_js__WEBPACK_IMPORTED_MODULE_0__.globalRegistry.add(cl, args[0]);
        return cl;
    };
    // helpers
    inst.isOptional = () => inst.safeParse(undefined).success;
    inst.isNullable = () => inst.safeParse(null).success;
    return inst;
});
/** @internal */
const _ZodString = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("_ZodString", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodString.init(inst, def);
    ZodType.init(inst, def);
    const bag = inst._zod.bag;
    inst.format = bag.format ?? null;
    inst.minLength = bag.minimum ?? null;
    inst.maxLength = bag.maximum ?? null;
    // validations
    inst.regex = (...args) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.regex(...args));
    inst.includes = (...args) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.includes(...args));
    inst.startsWith = (...args) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.startsWith(...args));
    inst.endsWith = (...args) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.endsWith(...args));
    inst.min = (...args) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.minLength(...args));
    inst.max = (...args) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.maxLength(...args));
    inst.length = (...args) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.length(...args));
    inst.nonempty = (...args) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.minLength(1, ...args));
    inst.lowercase = (params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.lowercase(params));
    inst.uppercase = (params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.uppercase(params));
    // transforms
    inst.trim = () => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.trim());
    inst.normalize = (...args) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.normalize(...args));
    inst.toLowerCase = () => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.toLowerCase());
    inst.toUpperCase = () => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.toUpperCase());
});
const ZodString = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodString", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodString.init(inst, def);
    _ZodString.init(inst, def);
    inst.email = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._email(ZodEmail, params));
    inst.url = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._url(ZodURL, params));
    inst.jwt = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._jwt(ZodJWT, params));
    inst.emoji = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._emoji(ZodEmoji, params));
    inst.guid = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._guid(ZodGUID, params));
    inst.uuid = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._uuid(ZodUUID, params));
    inst.uuidv4 = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._uuidv4(ZodUUID, params));
    inst.uuidv6 = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._uuidv6(ZodUUID, params));
    inst.uuidv7 = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._uuidv7(ZodUUID, params));
    inst.nanoid = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._nanoid(ZodNanoID, params));
    inst.guid = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._guid(ZodGUID, params));
    inst.cuid = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._cuid(ZodCUID, params));
    inst.cuid2 = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._cuid2(ZodCUID2, params));
    inst.ulid = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._ulid(ZodULID, params));
    inst.base64 = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._base64(ZodBase64, params));
    inst.base64url = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._base64url(ZodBase64URL, params));
    inst.xid = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._xid(ZodXID, params));
    inst.ksuid = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._ksuid(ZodKSUID, params));
    inst.ipv4 = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._ipv4(ZodIPv4, params));
    inst.ipv6 = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._ipv6(ZodIPv6, params));
    inst.cidrv4 = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._cidrv4(ZodCIDRv4, params));
    inst.cidrv6 = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._cidrv6(ZodCIDRv6, params));
    inst.e164 = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._e164(ZodE164, params));
    // iso
    inst.datetime = (params) => inst.check(_iso_js__WEBPACK_IMPORTED_MODULE_2__.datetime(params));
    inst.date = (params) => inst.check(_iso_js__WEBPACK_IMPORTED_MODULE_2__.date(params));
    inst.time = (params) => inst.check(_iso_js__WEBPACK_IMPORTED_MODULE_2__.time(params));
    inst.duration = (params) => inst.check(_iso_js__WEBPACK_IMPORTED_MODULE_2__.duration(params));
});
function string(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._string(ZodString, params);
}
const ZodStringFormat = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodStringFormat", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodStringFormat.init(inst, def);
    _ZodString.init(inst, def);
});
const ZodEmail = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodEmail", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodEmail.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function email(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._email(ZodEmail, params);
}
const ZodGUID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodGUID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodGUID.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function guid(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._guid(ZodGUID, params);
}
const ZodUUID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodUUID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodUUID.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function uuid(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._uuid(ZodUUID, params);
}
function uuidv4(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._uuidv4(ZodUUID, params);
}
// ZodUUIDv6
function uuidv6(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._uuidv6(ZodUUID, params);
}
// ZodUUIDv7
function uuidv7(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._uuidv7(ZodUUID, params);
}
const ZodURL = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodURL", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodURL.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function url(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._url(ZodURL, params);
}
function httpUrl(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._url(ZodURL, {
        protocol: /^https?$/,
        hostname: _core_index_js__WEBPACK_IMPORTED_MODULE_0__.regexes.domain,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.normalizeParams(params),
    });
}
const ZodEmoji = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodEmoji", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodEmoji.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function emoji(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._emoji(ZodEmoji, params);
}
const ZodNanoID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodNanoID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodNanoID.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function nanoid(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._nanoid(ZodNanoID, params);
}
const ZodCUID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodCUID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCUID.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function cuid(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._cuid(ZodCUID, params);
}
const ZodCUID2 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodCUID2", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCUID2.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function cuid2(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._cuid2(ZodCUID2, params);
}
const ZodULID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodULID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodULID.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function ulid(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._ulid(ZodULID, params);
}
const ZodXID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodXID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodXID.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function xid(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._xid(ZodXID, params);
}
const ZodKSUID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodKSUID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodKSUID.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function ksuid(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._ksuid(ZodKSUID, params);
}
const ZodIPv4 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodIPv4", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodIPv4.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function ipv4(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._ipv4(ZodIPv4, params);
}
const ZodIPv6 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodIPv6", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodIPv6.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function ipv6(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._ipv6(ZodIPv6, params);
}
const ZodCIDRv4 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodCIDRv4", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCIDRv4.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function cidrv4(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._cidrv4(ZodCIDRv4, params);
}
const ZodCIDRv6 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodCIDRv6", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCIDRv6.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function cidrv6(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._cidrv6(ZodCIDRv6, params);
}
const ZodBase64 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodBase64", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodBase64.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function base64(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._base64(ZodBase64, params);
}
const ZodBase64URL = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodBase64URL", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodBase64URL.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function base64url(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._base64url(ZodBase64URL, params);
}
const ZodE164 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodE164", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodE164.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function e164(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._e164(ZodE164, params);
}
const ZodJWT = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodJWT", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodJWT.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function jwt(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._jwt(ZodJWT, params);
}
const ZodCustomStringFormat = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodCustomStringFormat", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCustomStringFormat.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function stringFormat(format, fnOrRegex, _params = {}) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._stringFormat(ZodCustomStringFormat, format, fnOrRegex, _params);
}
function hostname(_params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._stringFormat(ZodCustomStringFormat, "hostname", _core_index_js__WEBPACK_IMPORTED_MODULE_0__.regexes.hostname, _params);
}
function hex(_params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._stringFormat(ZodCustomStringFormat, "hex", _core_index_js__WEBPACK_IMPORTED_MODULE_0__.regexes.hex, _params);
}
function hash(alg, params) {
    const enc = params?.enc ?? "hex";
    const format = `${alg}_${enc}`;
    const regex = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.regexes[format];
    if (!regex)
        throw new Error(`Unrecognized hash format: ${format}`);
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._stringFormat(ZodCustomStringFormat, format, regex, params);
}
const ZodNumber = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodNumber", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodNumber.init(inst, def);
    ZodType.init(inst, def);
    inst.gt = (value, params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.gt(value, params));
    inst.gte = (value, params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.gte(value, params));
    inst.min = (value, params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.gte(value, params));
    inst.lt = (value, params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.lt(value, params));
    inst.lte = (value, params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.lte(value, params));
    inst.max = (value, params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.lte(value, params));
    inst.int = (params) => inst.check(int(params));
    inst.safe = (params) => inst.check(int(params));
    inst.positive = (params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.gt(0, params));
    inst.nonnegative = (params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.gte(0, params));
    inst.negative = (params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.lt(0, params));
    inst.nonpositive = (params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.lte(0, params));
    inst.multipleOf = (value, params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.multipleOf(value, params));
    inst.step = (value, params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.multipleOf(value, params));
    // inst.finite = (params) => inst.check(core.finite(params));
    inst.finite = () => inst;
    const bag = inst._zod.bag;
    inst.minValue =
        Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
    inst.maxValue =
        Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
    inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? 0.5);
    inst.isFinite = true;
    inst.format = bag.format ?? null;
});
function number(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._number(ZodNumber, params);
}
const ZodNumberFormat = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodNumberFormat", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodNumberFormat.init(inst, def);
    ZodNumber.init(inst, def);
});
function int(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._int(ZodNumberFormat, params);
}
function float32(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._float32(ZodNumberFormat, params);
}
function float64(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._float64(ZodNumberFormat, params);
}
function int32(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._int32(ZodNumberFormat, params);
}
function uint32(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._uint32(ZodNumberFormat, params);
}
const ZodBoolean = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodBoolean", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodBoolean.init(inst, def);
    ZodType.init(inst, def);
});
function boolean(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._boolean(ZodBoolean, params);
}
const ZodBigInt = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodBigInt", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodBigInt.init(inst, def);
    ZodType.init(inst, def);
    inst.gte = (value, params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.gte(value, params));
    inst.min = (value, params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.gte(value, params));
    inst.gt = (value, params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.gt(value, params));
    inst.gte = (value, params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.gte(value, params));
    inst.min = (value, params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.gte(value, params));
    inst.lt = (value, params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.lt(value, params));
    inst.lte = (value, params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.lte(value, params));
    inst.max = (value, params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.lte(value, params));
    inst.positive = (params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.gt(BigInt(0), params));
    inst.negative = (params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.lt(BigInt(0), params));
    inst.nonpositive = (params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.lte(BigInt(0), params));
    inst.nonnegative = (params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.gte(BigInt(0), params));
    inst.multipleOf = (value, params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.multipleOf(value, params));
    const bag = inst._zod.bag;
    inst.minValue = bag.minimum ?? null;
    inst.maxValue = bag.maximum ?? null;
    inst.format = bag.format ?? null;
});
function bigint(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._bigint(ZodBigInt, params);
}
const ZodBigIntFormat = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodBigIntFormat", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodBigIntFormat.init(inst, def);
    ZodBigInt.init(inst, def);
});
// int64
function int64(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._int64(ZodBigIntFormat, params);
}
// uint64
function uint64(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._uint64(ZodBigIntFormat, params);
}
const ZodSymbol = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodSymbol", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodSymbol.init(inst, def);
    ZodType.init(inst, def);
});
function symbol(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._symbol(ZodSymbol, params);
}
const ZodUndefined = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodUndefined", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodUndefined.init(inst, def);
    ZodType.init(inst, def);
});
function _undefined(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._undefined(ZodUndefined, params);
}

const ZodNull = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodNull", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodNull.init(inst, def);
    ZodType.init(inst, def);
});
function _null(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._null(ZodNull, params);
}

const ZodAny = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodAny", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodAny.init(inst, def);
    ZodType.init(inst, def);
});
function any() {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._any(ZodAny);
}
const ZodUnknown = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodUnknown", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodUnknown.init(inst, def);
    ZodType.init(inst, def);
});
function unknown() {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._unknown(ZodUnknown);
}
const ZodNever = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodNever", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodNever.init(inst, def);
    ZodType.init(inst, def);
});
function never(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._never(ZodNever, params);
}
const ZodVoid = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodVoid", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodVoid.init(inst, def);
    ZodType.init(inst, def);
});
function _void(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._void(ZodVoid, params);
}

const ZodDate = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodDate", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodDate.init(inst, def);
    ZodType.init(inst, def);
    inst.min = (value, params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.gte(value, params));
    inst.max = (value, params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.lte(value, params));
    const c = inst._zod.bag;
    inst.minDate = c.minimum ? new Date(c.minimum) : null;
    inst.maxDate = c.maximum ? new Date(c.maximum) : null;
});
function date(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._date(ZodDate, params);
}
const ZodArray = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodArray", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodArray.init(inst, def);
    ZodType.init(inst, def);
    inst.element = def.element;
    inst.min = (minLength, params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.minLength(minLength, params));
    inst.nonempty = (params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.minLength(1, params));
    inst.max = (maxLength, params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.maxLength(maxLength, params));
    inst.length = (len, params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_1__.length(len, params));
    inst.unwrap = () => inst.element;
});
function array(element, params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._array(ZodArray, element, params);
}
// .keyof
function keyof(schema) {
    const shape = schema._zod.def.shape;
    return _enum(Object.keys(shape));
}
const ZodObject = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodObject", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodObjectJIT.init(inst, def);
    ZodType.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.defineLazy(inst, "shape", () => def.shape);
    inst.keyof = () => _enum(Object.keys(inst._zod.def.shape));
    inst.catchall = (catchall) => inst.clone({ ...inst._zod.def, catchall: catchall });
    inst.passthrough = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
    inst.loose = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
    inst.strict = () => inst.clone({ ...inst._zod.def, catchall: never() });
    inst.strip = () => inst.clone({ ...inst._zod.def, catchall: undefined });
    inst.extend = (incoming) => {
        return _core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.extend(inst, incoming);
    };
    inst.safeExtend = (incoming) => {
        return _core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.safeExtend(inst, incoming);
    };
    inst.merge = (other) => _core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.merge(inst, other);
    inst.pick = (mask) => _core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.pick(inst, mask);
    inst.omit = (mask) => _core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.omit(inst, mask);
    inst.partial = (...args) => _core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.partial(ZodOptional, inst, args[0]);
    inst.required = (...args) => _core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.required(ZodNonOptional, inst, args[0]);
});
function object(shape, params) {
    const def = {
        type: "object",
        get shape() {
            _core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.assignProp(this, "shape", shape ? _core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.objectClone(shape) : {});
            return this.shape;
        },
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.normalizeParams(params),
    };
    return new ZodObject(def);
}
// strictObject
function strictObject(shape, params) {
    return new ZodObject({
        type: "object",
        get shape() {
            _core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.assignProp(this, "shape", _core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.objectClone(shape));
            return this.shape;
        },
        catchall: never(),
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.normalizeParams(params),
    });
}
// looseObject
function looseObject(shape, params) {
    return new ZodObject({
        type: "object",
        get shape() {
            _core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.assignProp(this, "shape", _core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.objectClone(shape));
            return this.shape;
        },
        catchall: unknown(),
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.normalizeParams(params),
    });
}
const ZodUnion = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodUnion", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodUnion.init(inst, def);
    ZodType.init(inst, def);
    inst.options = def.options;
});
function union(options, params) {
    return new ZodUnion({
        type: "union",
        options: options,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.normalizeParams(params),
    });
}
const ZodDiscriminatedUnion = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodDiscriminatedUnion", (inst, def) => {
    ZodUnion.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodDiscriminatedUnion.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
    // const [options, params] = args;
    return new ZodDiscriminatedUnion({
        type: "union",
        options,
        discriminator,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.normalizeParams(params),
    });
}
const ZodIntersection = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodIntersection", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodIntersection.init(inst, def);
    ZodType.init(inst, def);
});
function intersection(left, right) {
    return new ZodIntersection({
        type: "intersection",
        left: left,
        right: right,
    });
}
const ZodTuple = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodTuple", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodTuple.init(inst, def);
    ZodType.init(inst, def);
    inst.rest = (rest) => inst.clone({
        ...inst._zod.def,
        rest: rest,
    });
});
function tuple(items, _paramsOrRest, _params) {
    const hasRest = _paramsOrRest instanceof _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodType;
    const params = hasRest ? _params : _paramsOrRest;
    const rest = hasRest ? _paramsOrRest : null;
    return new ZodTuple({
        type: "tuple",
        items: items,
        rest,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.normalizeParams(params),
    });
}
const ZodRecord = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodRecord", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodRecord.init(inst, def);
    ZodType.init(inst, def);
    inst.keyType = def.keyType;
    inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
    return new ZodRecord({
        type: "record",
        keyType,
        valueType: valueType,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.normalizeParams(params),
    });
}
// type alksjf = core.output<core.$ZodRecordKey>;
function partialRecord(keyType, valueType, params) {
    const k = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.clone(keyType);
    k._zod.values = undefined;
    return new ZodRecord({
        type: "record",
        keyType: k,
        valueType: valueType,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.normalizeParams(params),
    });
}
const ZodMap = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodMap", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodMap.init(inst, def);
    ZodType.init(inst, def);
    inst.keyType = def.keyType;
    inst.valueType = def.valueType;
});
function map(keyType, valueType, params) {
    return new ZodMap({
        type: "map",
        keyType: keyType,
        valueType: valueType,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.normalizeParams(params),
    });
}
const ZodSet = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodSet", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodSet.init(inst, def);
    ZodType.init(inst, def);
    inst.min = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._minSize(...args));
    inst.nonempty = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._minSize(1, params));
    inst.max = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._maxSize(...args));
    inst.size = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._size(...args));
});
function set(valueType, params) {
    return new ZodSet({
        type: "set",
        valueType: valueType,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.normalizeParams(params),
    });
}
const ZodEnum = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodEnum", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodEnum.init(inst, def);
    ZodType.init(inst, def);
    inst.enum = def.entries;
    inst.options = Object.values(def.entries);
    const keys = new Set(Object.keys(def.entries));
    inst.extract = (values, params) => {
        const newEntries = {};
        for (const value of values) {
            if (keys.has(value)) {
                newEntries[value] = def.entries[value];
            }
            else
                throw new Error(`Key ${value} not found in enum`);
        }
        return new ZodEnum({
            ...def,
            checks: [],
            ..._core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.normalizeParams(params),
            entries: newEntries,
        });
    };
    inst.exclude = (values, params) => {
        const newEntries = { ...def.entries };
        for (const value of values) {
            if (keys.has(value)) {
                delete newEntries[value];
            }
            else
                throw new Error(`Key ${value} not found in enum`);
        }
        return new ZodEnum({
            ...def,
            checks: [],
            ..._core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.normalizeParams(params),
            entries: newEntries,
        });
    };
});
function _enum(values, params) {
    const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
    return new ZodEnum({
        type: "enum",
        entries,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.normalizeParams(params),
    });
}

/** @deprecated This API has been merged into `z.enum()`. Use `z.enum()` instead.
 *
 * ```ts
 * enum Colors { red, green, blue }
 * z.enum(Colors);
 * ```
 */
function nativeEnum(entries, params) {
    return new ZodEnum({
        type: "enum",
        entries,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.normalizeParams(params),
    });
}
const ZodLiteral = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodLiteral", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodLiteral.init(inst, def);
    ZodType.init(inst, def);
    inst.values = new Set(def.values);
    Object.defineProperty(inst, "value", {
        get() {
            if (def.values.length > 1) {
                throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
            }
            return def.values[0];
        },
    });
});
function literal(value, params) {
    return new ZodLiteral({
        type: "literal",
        values: Array.isArray(value) ? value : [value],
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.normalizeParams(params),
    });
}
const ZodFile = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodFile", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodFile.init(inst, def);
    ZodType.init(inst, def);
    inst.min = (size, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._minSize(size, params));
    inst.max = (size, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._maxSize(size, params));
    inst.mime = (types, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_0__._mime(Array.isArray(types) ? types : [types], params));
});
function file(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._file(ZodFile, params);
}
const ZodTransform = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodTransform", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodTransform.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.parse = (payload, _ctx) => {
        if (_ctx.direction === "backward") {
            throw new _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodEncodeError(inst.constructor.name);
        }
        payload.addIssue = (issue) => {
            if (typeof issue === "string") {
                payload.issues.push(_core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.issue(issue, payload.value, def));
            }
            else {
                // for Zod 3 backwards compatibility
                const _issue = issue;
                if (_issue.fatal)
                    _issue.continue = false;
                _issue.code ?? (_issue.code = "custom");
                _issue.input ?? (_issue.input = payload.value);
                _issue.inst ?? (_issue.inst = inst);
                // _issue.continue ??= true;
                payload.issues.push(_core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.issue(_issue));
            }
        };
        const output = def.transform(payload.value, payload);
        if (output instanceof Promise) {
            return output.then((output) => {
                payload.value = output;
                return payload;
            });
        }
        payload.value = output;
        return payload;
    };
});
function transform(fn) {
    return new ZodTransform({
        type: "transform",
        transform: fn,
    });
}
const ZodOptional = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodOptional", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodOptional.init(inst, def);
    ZodType.init(inst, def);
    inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
    return new ZodOptional({
        type: "optional",
        innerType: innerType,
    });
}
const ZodNullable = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodNullable", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodNullable.init(inst, def);
    ZodType.init(inst, def);
    inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
    return new ZodNullable({
        type: "nullable",
        innerType: innerType,
    });
}
// nullish
function nullish(innerType) {
    return optional(nullable(innerType));
}
const ZodDefault = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodDefault", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodDefault.init(inst, def);
    ZodType.init(inst, def);
    inst.unwrap = () => inst._zod.def.innerType;
    inst.removeDefault = inst.unwrap;
});
function _default(innerType, defaultValue) {
    return new ZodDefault({
        type: "default",
        innerType: innerType,
        get defaultValue() {
            return typeof defaultValue === "function" ? defaultValue() : _core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.shallowClone(defaultValue);
        },
    });
}
const ZodPrefault = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodPrefault", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodPrefault.init(inst, def);
    ZodType.init(inst, def);
    inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
    return new ZodPrefault({
        type: "prefault",
        innerType: innerType,
        get defaultValue() {
            return typeof defaultValue === "function" ? defaultValue() : _core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.shallowClone(defaultValue);
        },
    });
}
const ZodNonOptional = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodNonOptional", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodNonOptional.init(inst, def);
    ZodType.init(inst, def);
    inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
    return new ZodNonOptional({
        type: "nonoptional",
        innerType: innerType,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.normalizeParams(params),
    });
}
const ZodSuccess = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodSuccess", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodSuccess.init(inst, def);
    ZodType.init(inst, def);
    inst.unwrap = () => inst._zod.def.innerType;
});
function success(innerType) {
    return new ZodSuccess({
        type: "success",
        innerType: innerType,
    });
}
const ZodCatch = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodCatch", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCatch.init(inst, def);
    ZodType.init(inst, def);
    inst.unwrap = () => inst._zod.def.innerType;
    inst.removeCatch = inst.unwrap;
});
function _catch(innerType, catchValue) {
    return new ZodCatch({
        type: "catch",
        innerType: innerType,
        catchValue: (typeof catchValue === "function" ? catchValue : () => catchValue),
    });
}

const ZodNaN = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodNaN", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodNaN.init(inst, def);
    ZodType.init(inst, def);
});
function nan(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._nan(ZodNaN, params);
}
const ZodPipe = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodPipe", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodPipe.init(inst, def);
    ZodType.init(inst, def);
    inst.in = def.in;
    inst.out = def.out;
});
function pipe(in_, out) {
    return new ZodPipe({
        type: "pipe",
        in: in_,
        out: out,
        // ...util.normalizeParams(params),
    });
}
const ZodCodec = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodCodec", (inst, def) => {
    ZodPipe.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCodec.init(inst, def);
});
function codec(in_, out, params) {
    return new ZodCodec({
        type: "pipe",
        in: in_,
        out: out,
        transform: params.decode,
        reverseTransform: params.encode,
    });
}
const ZodReadonly = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodReadonly", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodReadonly.init(inst, def);
    ZodType.init(inst, def);
    inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
    return new ZodReadonly({
        type: "readonly",
        innerType: innerType,
    });
}
const ZodTemplateLiteral = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodTemplateLiteral", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodTemplateLiteral.init(inst, def);
    ZodType.init(inst, def);
});
function templateLiteral(parts, params) {
    return new ZodTemplateLiteral({
        type: "template_literal",
        parts,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.normalizeParams(params),
    });
}
const ZodLazy = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodLazy", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodLazy.init(inst, def);
    ZodType.init(inst, def);
    inst.unwrap = () => inst._zod.def.getter();
});
function lazy(getter) {
    return new ZodLazy({
        type: "lazy",
        getter: getter,
    });
}
const ZodPromise = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodPromise", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodPromise.init(inst, def);
    ZodType.init(inst, def);
    inst.unwrap = () => inst._zod.def.innerType;
});
function promise(innerType) {
    return new ZodPromise({
        type: "promise",
        innerType: innerType,
    });
}
const ZodFunction = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodFunction", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodFunction.init(inst, def);
    ZodType.init(inst, def);
});
function _function(params) {
    return new ZodFunction({
        type: "function",
        input: Array.isArray(params?.input) ? tuple(params?.input) : (params?.input ?? array(unknown())),
        output: params?.output ?? unknown(),
    });
}

const ZodCustom = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodCustom", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCustom.init(inst, def);
    ZodType.init(inst, def);
});
// custom checks
function check(fn) {
    const ch = new _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheck({
        check: "custom",
        // ...util.normalizeParams(params),
    });
    ch._zod.check = fn;
    return ch;
}
function custom(fn, _params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._custom(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._refine(ZodCustom, fn, _params);
}
// superRefine
function superRefine(fn) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._superRefine(fn);
}
function _instanceof(cls, params = {
    error: `Input not instance of ${cls.name}`,
}) {
    const inst = new ZodCustom({
        type: "custom",
        check: "custom",
        fn: (data) => data instanceof cls,
        abort: true,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_0__.util.normalizeParams(params),
    });
    inst._zod.bag.Class = cls;
    return inst;
}

// stringbool
const stringbool = (...args) => _core_index_js__WEBPACK_IMPORTED_MODULE_0__._stringbool({
    Codec: ZodCodec,
    Boolean: ZodBoolean,
    String: ZodString,
}, ...args);
function json(params) {
    const jsonSchema = lazy(() => {
        return union([string(params), number(), boolean(), _null(), array(jsonSchema), record(string(), jsonSchema)]);
    });
    return jsonSchema;
}
// preprocess
// /** @deprecated Use `z.pipe()` and `z.transform()` instead. */
function preprocess(fn, schema) {
    return pipe(transform(fn), schema);
}


/***/ }),

/***/ 2404:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $ZodError: () => (/* binding */ $ZodError),
/* harmony export */   $ZodRealError: () => (/* binding */ $ZodRealError),
/* harmony export */   flattenError: () => (/* binding */ flattenError),
/* harmony export */   formatError: () => (/* binding */ formatError),
/* harmony export */   prettifyError: () => (/* binding */ prettifyError),
/* harmony export */   toDotPath: () => (/* binding */ toDotPath),
/* harmony export */   treeifyError: () => (/* binding */ treeifyError)
/* harmony export */ });
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7476);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4995);


const initializer = (inst, def) => {
    inst.name = "$ZodError";
    Object.defineProperty(inst, "_zod", {
        value: inst._zod,
        enumerable: false,
    });
    Object.defineProperty(inst, "issues", {
        value: def,
        enumerable: false,
    });
    inst.message = JSON.stringify(def, _util_js__WEBPACK_IMPORTED_MODULE_1__.jsonStringifyReplacer, 2);
    Object.defineProperty(inst, "toString", {
        value: () => inst.message,
        enumerable: false,
    });
};
const $ZodError = (0,_core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor)("$ZodError", initializer);
const $ZodRealError = (0,_core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor)("$ZodError", initializer, { Parent: Error });
function flattenError(error, mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of error.issues) {
        if (sub.path.length > 0) {
            fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
            fieldErrors[sub.path[0]].push(mapper(sub));
        }
        else {
            formErrors.push(mapper(sub));
        }
    }
    return { formErrors, fieldErrors };
}
function formatError(error, _mapper) {
    const mapper = _mapper ||
        function (issue) {
            return issue.message;
        };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
        for (const issue of error.issues) {
            if (issue.code === "invalid_union" && issue.errors.length) {
                issue.errors.map((issues) => processError({ issues }));
            }
            else if (issue.code === "invalid_key") {
                processError({ issues: issue.issues });
            }
            else if (issue.code === "invalid_element") {
                processError({ issues: issue.issues });
            }
            else if (issue.path.length === 0) {
                fieldErrors._errors.push(mapper(issue));
            }
            else {
                let curr = fieldErrors;
                let i = 0;
                while (i < issue.path.length) {
                    const el = issue.path[i];
                    const terminal = i === issue.path.length - 1;
                    if (!terminal) {
                        curr[el] = curr[el] || { _errors: [] };
                    }
                    else {
                        curr[el] = curr[el] || { _errors: [] };
                        curr[el]._errors.push(mapper(issue));
                    }
                    curr = curr[el];
                    i++;
                }
            }
        }
    };
    processError(error);
    return fieldErrors;
}
function treeifyError(error, _mapper) {
    const mapper = _mapper ||
        function (issue) {
            return issue.message;
        };
    const result = { errors: [] };
    const processError = (error, path = []) => {
        var _a, _b;
        for (const issue of error.issues) {
            if (issue.code === "invalid_union" && issue.errors.length) {
                // regular union error
                issue.errors.map((issues) => processError({ issues }, issue.path));
            }
            else if (issue.code === "invalid_key") {
                processError({ issues: issue.issues }, issue.path);
            }
            else if (issue.code === "invalid_element") {
                processError({ issues: issue.issues }, issue.path);
            }
            else {
                const fullpath = [...path, ...issue.path];
                if (fullpath.length === 0) {
                    result.errors.push(mapper(issue));
                    continue;
                }
                let curr = result;
                let i = 0;
                while (i < fullpath.length) {
                    const el = fullpath[i];
                    const terminal = i === fullpath.length - 1;
                    if (typeof el === "string") {
                        curr.properties ?? (curr.properties = {});
                        (_a = curr.properties)[el] ?? (_a[el] = { errors: [] });
                        curr = curr.properties[el];
                    }
                    else {
                        curr.items ?? (curr.items = []);
                        (_b = curr.items)[el] ?? (_b[el] = { errors: [] });
                        curr = curr.items[el];
                    }
                    if (terminal) {
                        curr.errors.push(mapper(issue));
                    }
                    i++;
                }
            }
        }
    };
    processError(error);
    return result;
}
/** Format a ZodError as a human-readable string in the following form.
 *
 * From
 *
 * ```ts
 * ZodError {
 *   issues: [
 *     {
 *       expected: 'string',
 *       code: 'invalid_type',
 *       path: [ 'username' ],
 *       message: 'Invalid input: expected string'
 *     },
 *     {
 *       expected: 'number',
 *       code: 'invalid_type',
 *       path: [ 'favoriteNumbers', 1 ],
 *       message: 'Invalid input: expected number'
 *     }
 *   ];
 * }
 * ```
 *
 * to
 *
 * ```
 * username
 *   ✖ Expected number, received string at "username
 * favoriteNumbers[0]
 *   ✖ Invalid input: expected number
 * ```
 */
function toDotPath(_path) {
    const segs = [];
    const path = _path.map((seg) => (typeof seg === "object" ? seg.key : seg));
    for (const seg of path) {
        if (typeof seg === "number")
            segs.push(`[${seg}]`);
        else if (typeof seg === "symbol")
            segs.push(`[${JSON.stringify(String(seg))}]`);
        else if (/[^\w$]/.test(seg))
            segs.push(`[${JSON.stringify(seg)}]`);
        else {
            if (segs.length)
                segs.push(".");
            segs.push(seg);
        }
    }
    return segs.join("");
}
function prettifyError(error) {
    const lines = [];
    // sort by path length
    const issues = [...error.issues].sort((a, b) => (a.path ?? []).length - (b.path ?? []).length);
    // Process each issue
    for (const issue of issues) {
        lines.push(`✖ ${issue.message}`);
        if (issue.path?.length)
            lines.push(`  → at ${toDotPath(issue.path)}`);
    }
    // Convert Map to formatted string
    return lines.join("\n");
}


/***/ }),

/***/ 2431:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "字元", verb: "擁有" },
        file: { unit: "位元組", verb: "擁有" },
        array: { unit: "項目", verb: "擁有" },
        set: { unit: "項目", verb: "擁有" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "number";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "array";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "輸入",
        email: "郵件地址",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO 日期時間",
        date: "ISO 日期",
        time: "ISO 時間",
        duration: "ISO 期間",
        ipv4: "IPv4 位址",
        ipv6: "IPv6 位址",
        cidrv4: "IPv4 範圍",
        cidrv6: "IPv6 範圍",
        base64: "base64 編碼字串",
        base64url: "base64url 編碼字串",
        json_string: "JSON 字串",
        e164: "E.164 數值",
        jwt: "JWT",
        template_literal: "輸入",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `無效的輸入值：預期為 ${issue.expected}，但收到 ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `無效的輸入值：預期為 ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `無效的選項：預期為以下其中之一 ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `數值過大：預期 ${issue.origin ?? "值"} 應為 ${adj}${issue.maximum.toString()} ${sizing.unit ?? "個元素"}`;
                return `數值過大：預期 ${issue.origin ?? "值"} 應為 ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `數值過小：預期 ${issue.origin} 應為 ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `數值過小：預期 ${issue.origin} 應為 ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with") {
                    return `無效的字串：必須以 "${_issue.prefix}" 開頭`;
                }
                if (_issue.format === "ends_with")
                    return `無效的字串：必須以 "${_issue.suffix}" 結尾`;
                if (_issue.format === "includes")
                    return `無效的字串：必須包含 "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `無效的字串：必須符合格式 ${_issue.pattern}`;
                return `無效的 ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `無效的數字：必須為 ${issue.divisor} 的倍數`;
            case "unrecognized_keys":
                return `無法識別的鍵值${issue.keys.length > 1 ? "們" : ""}：${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, "、")}`;
            case "invalid_key":
                return `${issue.origin} 中有無效的鍵值`;
            case "invalid_union":
                return "無效的輸入值";
            case "invalid_element":
                return `${issue.origin} 中有無效的值`;
            default:
                return `無效的輸入值`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 2790:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MenuSystem: () => (/* binding */ MenuSystem),
/* harmony export */   menuSystem: () => (/* binding */ menuSystem)
/* harmony export */ });
/* harmony import */ var _globalState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5518);


// Menu system with jQuery-based button management
class MenuSystem {
    static instance;
    currentState = 'main';
    constructor() { }
    static getInstance() {
        if (!MenuSystem.instance) {
            MenuSystem.instance = new MenuSystem();
        }
        return MenuSystem.instance;
    }
    // Main button (always visible)
    get mainButton() {
        return {
            name: '🎮 MVU 主控台',
            visible: true,
            label: '🎮 MVU 主控台'
        };
    }
    // Main menu buttons
    get mainMenuButtons() {
        return [
            { name: '🎲 玩法', visible: true, label: '🎲 玩法' },
            { name: '👤 身份', visible: true, label: '👤 身份' },
            { name: '🔄 强刷', visible: true, label: '🔄 强刷页面' },
            { name: '❌ 关闭', visible: true, label: '❌ 关闭控制台' },
        ];
    }
    // Play menu buttons (dynamic)
    getPlayMenuButtons() {
        const hasActivePlay = _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.get('ALARIC_SOP_ACTIVE') || _globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.get('ALARIC_CURRENT_SOP');
        const endButtonLabel = hasActivePlay ? '🏁 结束玩法' : '🗑️ 清除玩法注入';
        const hasSpice = !!_globalState__WEBPACK_IMPORTED_MODULE_0__.globalState.get('ALARIC_CURRENT_SPICE');
        const spiceButtonLabel = hasSpice ? '🍅 更换佐料' : '🍅 加点佐料';
        return [
            { name: '🔞 NSFW', visible: true, label: '🔞 NSFW' },
            { name: '📅 今日重点', visible: true, label: '📅 今日重点' },
            { name: '🎲 摇点主菜', visible: true, label: '🎲 摇点主菜' },
            { name: '🍅 加点佐料', visible: true, label: spiceButtonLabel },
            { name: '🏁 结束玩法', visible: true, label: endButtonLabel },
            { name: '👁️ 查看注入', visible: true, label: '👁️ 查看注入' },
            { name: '🔙 返回', visible: true, label: '🔙 返回主菜单' },
        ];
    }
    // Identity menu buttons
    get identityMenuButtons() {
        return [
            { name: '📊 状态', visible: true, label: '📊 状态' },
            { name: '🛡️ 安全协议', visible: true, label: '🛡️ 安全协议' },
            { name: '🆔 身份', visible: true, label: '🆔 身份' },
            { name: '🔀 阶段', visible: true, label: '🔀 阶段' },
            { name: '❤️ XP', visible: true, label: '❤️ XP' },
            { name: '🔙 返回', visible: true, label: '🔙 返回主菜单' },
        ];
    }
    // Show main menu
    showMainMenu() {
        _globalState__WEBPACK_IMPORTED_MODULE_0__.DomUtils.showButtons(this.mainMenuButtons);
        this.currentState = 'main_menu';
    }
    // Show play menu
    showPlayMenu() {
        _globalState__WEBPACK_IMPORTED_MODULE_0__.DomUtils.showButtons(this.getPlayMenuButtons());
        this.currentState = 'play_menu';
    }
    // Show identity menu
    showIdentityMenu() {
        _globalState__WEBPACK_IMPORTED_MODULE_0__.DomUtils.showButtons(this.identityMenuButtons);
        this.currentState = 'identity_menu';
    }
    // Close console
    closeConsole() {
        _globalState__WEBPACK_IMPORTED_MODULE_0__.DomUtils.showButtons([this.mainButton]);
        this.currentState = 'main';
    }
    // Get current state
    getCurrentState() {
        return this.currentState;
    }
    // Update play menu (when state changes)
    updatePlayMenu() {
        if (this.currentState === 'play_menu') {
            this.showPlayMenu();
        }
    }
}
// Export singleton instance
const menuSystem = MenuSystem.getInstance();


/***/ }),

/***/ 2849:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ 2915:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "caractères", verb: "avoir" },
        file: { unit: "octets", verb: "avoir" },
        array: { unit: "éléments", verb: "avoir" },
        set: { unit: "éléments", verb: "avoir" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "nombre";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "tableau";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "entrée",
        email: "adresse e-mail",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "date et heure ISO",
        date: "date ISO",
        time: "heure ISO",
        duration: "durée ISO",
        ipv4: "adresse IPv4",
        ipv6: "adresse IPv6",
        cidrv4: "plage IPv4",
        cidrv6: "plage IPv6",
        base64: "chaîne encodée en base64",
        base64url: "chaîne encodée en base64url",
        json_string: "chaîne JSON",
        e164: "numéro E.164",
        jwt: "JWT",
        template_literal: "entrée",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Entrée invalide : ${issue.expected} attendu, ${parsedType(issue.input)} reçu`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Entrée invalide : ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])} attendu`;
                return `Option invalide : une valeur parmi ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")} attendue`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Trop grand : ${issue.origin ?? "valeur"} doit ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "élément(s)"}`;
                return `Trop grand : ${issue.origin ?? "valeur"} doit être ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Trop petit : ${issue.origin} doit ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `Trop petit : ${issue.origin} doit être ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `Chaîne invalide : doit commencer par "${_issue.prefix}"`;
                if (_issue.format === "ends_with")
                    return `Chaîne invalide : doit se terminer par "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Chaîne invalide : doit inclure "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Chaîne invalide : doit correspondre au modèle ${_issue.pattern}`;
                return `${Nouns[_issue.format] ?? issue.format} invalide`;
            }
            case "not_multiple_of":
                return `Nombre invalide : doit être un multiple de ${issue.divisor}`;
            case "unrecognized_keys":
                return `Clé${issue.keys.length > 1 ? "s" : ""} non reconnue${issue.keys.length > 1 ? "s" : ""} : ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Clé invalide dans ${issue.origin}`;
            case "invalid_union":
                return "Entrée invalide";
            case "invalid_element":
                return `Valeur invalide dans ${issue.origin}`;
            default:
                return `Entrée invalide`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 2968:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "எழுத்துக்கள்", verb: "கொண்டிருக்க வேண்டும்" },
        file: { unit: "பைட்டுகள்", verb: "கொண்டிருக்க வேண்டும்" },
        array: { unit: "உறுப்புகள்", verb: "கொண்டிருக்க வேண்டும்" },
        set: { unit: "உறுப்புகள்", verb: "கொண்டிருக்க வேண்டும்" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "எண் அல்லாதது" : "எண்";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "அணி";
                }
                if (data === null) {
                    return "வெறுமை";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "உள்ளீடு",
        email: "மின்னஞ்சல் முகவரி",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO தேதி நேரம்",
        date: "ISO தேதி",
        time: "ISO நேரம்",
        duration: "ISO கால அளவு",
        ipv4: "IPv4 முகவரி",
        ipv6: "IPv6 முகவரி",
        cidrv4: "IPv4 வரம்பு",
        cidrv6: "IPv6 வரம்பு",
        base64: "base64-encoded சரம்",
        base64url: "base64url-encoded சரம்",
        json_string: "JSON சரம்",
        e164: "E.164 எண்",
        jwt: "JWT",
        template_literal: "input",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${issue.expected}, பெறப்பட்டது ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `தவறான விருப்பம்: எதிர்பார்க்கப்பட்டது ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")} இல் ஒன்று`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${issue.origin ?? "மதிப்பு"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "உறுப்புகள்"} ஆக இருக்க வேண்டும்`;
                }
                return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${issue.origin ?? "மதிப்பு"} ${adj}${issue.maximum.toString()} ஆக இருக்க வேண்டும்`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} ஆக இருக்க வேண்டும்`; //
                }
                return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${issue.origin} ${adj}${issue.minimum.toString()} ஆக இருக்க வேண்டும்`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `தவறான சரம்: "${_issue.prefix}" இல் தொடங்க வேண்டும்`;
                if (_issue.format === "ends_with")
                    return `தவறான சரம்: "${_issue.suffix}" இல் முடிவடைய வேண்டும்`;
                if (_issue.format === "includes")
                    return `தவறான சரம்: "${_issue.includes}" ஐ உள்ளடக்க வேண்டும்`;
                if (_issue.format === "regex")
                    return `தவறான சரம்: ${_issue.pattern} முறைபாட்டுடன் பொருந்த வேண்டும்`;
                return `தவறான ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `தவறான எண்: ${issue.divisor} இன் பலமாக இருக்க வேண்டும்`;
            case "unrecognized_keys":
                return `அடையாளம் தெரியாத விசை${issue.keys.length > 1 ? "கள்" : ""}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `${issue.origin} இல் தவறான விசை`;
            case "invalid_union":
                return "தவறான உள்ளீடு";
            case "invalid_element":
                return `${issue.origin} இல் தவறான மதிப்பு`;
            default:
                return `தவறான உள்ளீடு`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 2996:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   base64: () => (/* binding */ base64),
/* harmony export */   base64url: () => (/* binding */ base64url),
/* harmony export */   bigint: () => (/* binding */ bigint),
/* harmony export */   boolean: () => (/* binding */ boolean),
/* harmony export */   browserEmail: () => (/* binding */ browserEmail),
/* harmony export */   cidrv4: () => (/* binding */ cidrv4),
/* harmony export */   cidrv6: () => (/* binding */ cidrv6),
/* harmony export */   cuid: () => (/* binding */ cuid),
/* harmony export */   cuid2: () => (/* binding */ cuid2),
/* harmony export */   date: () => (/* binding */ date),
/* harmony export */   datetime: () => (/* binding */ datetime),
/* harmony export */   domain: () => (/* binding */ domain),
/* harmony export */   duration: () => (/* binding */ duration),
/* harmony export */   e164: () => (/* binding */ e164),
/* harmony export */   email: () => (/* binding */ email),
/* harmony export */   emoji: () => (/* binding */ emoji),
/* harmony export */   extendedDuration: () => (/* binding */ extendedDuration),
/* harmony export */   guid: () => (/* binding */ guid),
/* harmony export */   hex: () => (/* binding */ hex),
/* harmony export */   hostname: () => (/* binding */ hostname),
/* harmony export */   html5Email: () => (/* binding */ html5Email),
/* harmony export */   idnEmail: () => (/* binding */ idnEmail),
/* harmony export */   integer: () => (/* binding */ integer),
/* harmony export */   ipv4: () => (/* binding */ ipv4),
/* harmony export */   ipv6: () => (/* binding */ ipv6),
/* harmony export */   ksuid: () => (/* binding */ ksuid),
/* harmony export */   lowercase: () => (/* binding */ lowercase),
/* harmony export */   md5_base64: () => (/* binding */ md5_base64),
/* harmony export */   md5_base64url: () => (/* binding */ md5_base64url),
/* harmony export */   md5_hex: () => (/* binding */ md5_hex),
/* harmony export */   nanoid: () => (/* binding */ nanoid),
/* harmony export */   "null": () => (/* binding */ _null),
/* harmony export */   number: () => (/* binding */ number),
/* harmony export */   rfc5322Email: () => (/* binding */ rfc5322Email),
/* harmony export */   sha1_base64: () => (/* binding */ sha1_base64),
/* harmony export */   sha1_base64url: () => (/* binding */ sha1_base64url),
/* harmony export */   sha1_hex: () => (/* binding */ sha1_hex),
/* harmony export */   sha256_base64: () => (/* binding */ sha256_base64),
/* harmony export */   sha256_base64url: () => (/* binding */ sha256_base64url),
/* harmony export */   sha256_hex: () => (/* binding */ sha256_hex),
/* harmony export */   sha384_base64: () => (/* binding */ sha384_base64),
/* harmony export */   sha384_base64url: () => (/* binding */ sha384_base64url),
/* harmony export */   sha384_hex: () => (/* binding */ sha384_hex),
/* harmony export */   sha512_base64: () => (/* binding */ sha512_base64),
/* harmony export */   sha512_base64url: () => (/* binding */ sha512_base64url),
/* harmony export */   sha512_hex: () => (/* binding */ sha512_hex),
/* harmony export */   string: () => (/* binding */ string),
/* harmony export */   time: () => (/* binding */ time),
/* harmony export */   ulid: () => (/* binding */ ulid),
/* harmony export */   undefined: () => (/* binding */ _undefined),
/* harmony export */   unicodeEmail: () => (/* binding */ unicodeEmail),
/* harmony export */   uppercase: () => (/* binding */ uppercase),
/* harmony export */   uuid: () => (/* binding */ uuid),
/* harmony export */   uuid4: () => (/* binding */ uuid4),
/* harmony export */   uuid6: () => (/* binding */ uuid6),
/* harmony export */   uuid7: () => (/* binding */ uuid7),
/* harmony export */   xid: () => (/* binding */ xid)
/* harmony export */ });
const cuid = /^[cC][^\s-]{8,}$/;
const cuid2 = /^[0-9a-z]+$/;
const ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
const xid = /^[0-9a-vA-V]{20}$/;
const ksuid = /^[A-Za-z0-9]{27}$/;
const nanoid = /^[a-zA-Z0-9_-]{21}$/;
/** ISO 8601-1 duration regex. Does not support the 8601-2 extensions like negative durations or fractional/negative components. */
const duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
/** Implements ISO 8601-2 extensions like explicit +- prefixes, mixing weeks with other units, and fractional/negative components. */
const extendedDuration = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
/** A regex for any UUID-like identifier: 8-4-4-4-12 hex pattern */
const guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
/** Returns a regex for validating an RFC 9562/4122 UUID.
 *
 * @param version Optionally specify a version 1-8. If no version is specified, all versions are supported. */
const uuid = (version) => {
    if (!version)
        return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
    return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
const uuid4 = /*@__PURE__*/ uuid(4);
const uuid6 = /*@__PURE__*/ uuid(6);
const uuid7 = /*@__PURE__*/ uuid(7);
/** Practical email validation */
const email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
/** Equivalent to the HTML5 input[type=email] validation implemented by browsers. Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email */
const html5Email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
/** The classic emailregex.com regex for RFC 5322-compliant emails */
const rfc5322Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/** A loose regex that allows Unicode characters, enforces length limits, and that's about it. */
const unicodeEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
const idnEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
const browserEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
// from https://thekevinscott.com/emojis-in-javascript/#writing-a-regular-expression
const _emoji = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function emoji() {
    return new RegExp(_emoji, "u");
}
const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})$/;
const cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
const cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
// https://stackoverflow.com/questions/7860392/determine-if-string-is-in-base64-using-javascript
const base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
const base64url = /^[A-Za-z0-9_-]*$/;
// based on https://stackoverflow.com/questions/106179/regular-expression-to-match-dns-hostname-or-ip-address
// export const hostname: RegExp = /^([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+$/;
const hostname = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/;
const domain = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
// https://blog.stevenlevithan.com/archives/validate-phone-number#r4-3 (regex sans spaces)
const e164 = /^\+(?:[0-9]){6,14}[0-9]$/;
// const dateSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
const dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
const date = /*@__PURE__*/ new RegExp(`^${dateSource}$`);
function timeSource(args) {
    const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
    const regex = typeof args.precision === "number"
        ? args.precision === -1
            ? `${hhmm}`
            : args.precision === 0
                ? `${hhmm}:[0-5]\\d`
                : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}`
        : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
    return regex;
}
function time(args) {
    return new RegExp(`^${timeSource(args)}$`);
}
// Adapted from https://stackoverflow.com/a/3143231
function datetime(args) {
    const time = timeSource({ precision: args.precision });
    const opts = ["Z"];
    if (args.local)
        opts.push("");
    // if (args.offset) opts.push(`([+-]\\d{2}:\\d{2})`);
    if (args.offset)
        opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
    const timeRegex = `${time}(?:${opts.join("|")})`;
    return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
const string = (params) => {
    const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
    return new RegExp(`^${regex}$`);
};
const bigint = /^\d+n?$/;
const integer = /^\d+$/;
const number = /^-?\d+(?:\.\d+)?/i;
const boolean = /true|false/i;
const _null = /null/i;

const _undefined = /undefined/i;

// regex for string with no uppercase letters
const lowercase = /^[^A-Z]*$/;
// regex for string with no lowercase letters
const uppercase = /^[^a-z]*$/;
// regex for hexadecimal strings (any length)
const hex = /^[0-9a-fA-F]*$/;
// Hash regexes for different algorithms and encodings
// Helper function to create base64 regex with exact length and padding
function fixedBase64(bodyLength, padding) {
    return new RegExp(`^[A-Za-z0-9+/]{${bodyLength}}${padding}$`);
}
// Helper function to create base64url regex with exact length (no padding)
function fixedBase64url(length) {
    return new RegExp(`^[A-Za-z0-9-_]{${length}}$`);
}
// MD5 (16 bytes): base64 = 24 chars total (22 + "==")
const md5_hex = /^[0-9a-fA-F]{32}$/;
const md5_base64 = /*@__PURE__*/ fixedBase64(22, "==");
const md5_base64url = /*@__PURE__*/ fixedBase64url(22);
// SHA1 (20 bytes): base64 = 28 chars total (27 + "=")
const sha1_hex = /^[0-9a-fA-F]{40}$/;
const sha1_base64 = /*@__PURE__*/ fixedBase64(27, "=");
const sha1_base64url = /*@__PURE__*/ fixedBase64url(27);
// SHA256 (32 bytes): base64 = 44 chars total (43 + "=")
const sha256_hex = /^[0-9a-fA-F]{64}$/;
const sha256_base64 = /*@__PURE__*/ fixedBase64(43, "=");
const sha256_base64url = /*@__PURE__*/ fixedBase64url(43);
// SHA384 (48 bytes): base64 = 64 chars total (no padding)
const sha384_hex = /^[0-9a-fA-F]{96}$/;
const sha384_base64 = /*@__PURE__*/ fixedBase64(64, "");
const sha384_base64url = /*@__PURE__*/ fixedBase64url(64);
// SHA512 (64 bytes): base64 = 88 chars total (86 + "==")
const sha512_hex = /^[0-9a-fA-F]{128}$/;
const sha512_base64 = /*@__PURE__*/ fixedBase64(86, "==");
const sha512_base64url = /*@__PURE__*/ fixedBase64url(86);


/***/ }),

/***/ 3259:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $ZodAny: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodAny),
/* harmony export */   $ZodArray: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodArray),
/* harmony export */   $ZodAsyncError: () => (/* reexport safe */ _core_js__WEBPACK_IMPORTED_MODULE_0__.$ZodAsyncError),
/* harmony export */   $ZodBase64: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodBase64),
/* harmony export */   $ZodBase64URL: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodBase64URL),
/* harmony export */   $ZodBigInt: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodBigInt),
/* harmony export */   $ZodBigIntFormat: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodBigIntFormat),
/* harmony export */   $ZodBoolean: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodBoolean),
/* harmony export */   $ZodCIDRv4: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodCIDRv4),
/* harmony export */   $ZodCIDRv6: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodCIDRv6),
/* harmony export */   $ZodCUID: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodCUID),
/* harmony export */   $ZodCUID2: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodCUID2),
/* harmony export */   $ZodCatch: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodCatch),
/* harmony export */   $ZodCheck: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_4__.$ZodCheck),
/* harmony export */   $ZodCheckBigIntFormat: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_4__.$ZodCheckBigIntFormat),
/* harmony export */   $ZodCheckEndsWith: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_4__.$ZodCheckEndsWith),
/* harmony export */   $ZodCheckGreaterThan: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_4__.$ZodCheckGreaterThan),
/* harmony export */   $ZodCheckIncludes: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_4__.$ZodCheckIncludes),
/* harmony export */   $ZodCheckLengthEquals: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_4__.$ZodCheckLengthEquals),
/* harmony export */   $ZodCheckLessThan: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_4__.$ZodCheckLessThan),
/* harmony export */   $ZodCheckLowerCase: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_4__.$ZodCheckLowerCase),
/* harmony export */   $ZodCheckMaxLength: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_4__.$ZodCheckMaxLength),
/* harmony export */   $ZodCheckMaxSize: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_4__.$ZodCheckMaxSize),
/* harmony export */   $ZodCheckMimeType: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_4__.$ZodCheckMimeType),
/* harmony export */   $ZodCheckMinLength: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_4__.$ZodCheckMinLength),
/* harmony export */   $ZodCheckMinSize: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_4__.$ZodCheckMinSize),
/* harmony export */   $ZodCheckMultipleOf: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_4__.$ZodCheckMultipleOf),
/* harmony export */   $ZodCheckNumberFormat: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_4__.$ZodCheckNumberFormat),
/* harmony export */   $ZodCheckOverwrite: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_4__.$ZodCheckOverwrite),
/* harmony export */   $ZodCheckProperty: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_4__.$ZodCheckProperty),
/* harmony export */   $ZodCheckRegex: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_4__.$ZodCheckRegex),
/* harmony export */   $ZodCheckSizeEquals: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_4__.$ZodCheckSizeEquals),
/* harmony export */   $ZodCheckStartsWith: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_4__.$ZodCheckStartsWith),
/* harmony export */   $ZodCheckStringFormat: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_4__.$ZodCheckStringFormat),
/* harmony export */   $ZodCheckUpperCase: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_4__.$ZodCheckUpperCase),
/* harmony export */   $ZodCodec: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodCodec),
/* harmony export */   $ZodCustom: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodCustom),
/* harmony export */   $ZodCustomStringFormat: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodCustomStringFormat),
/* harmony export */   $ZodDate: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodDate),
/* harmony export */   $ZodDefault: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodDefault),
/* harmony export */   $ZodDiscriminatedUnion: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodDiscriminatedUnion),
/* harmony export */   $ZodE164: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodE164),
/* harmony export */   $ZodEmail: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodEmail),
/* harmony export */   $ZodEmoji: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodEmoji),
/* harmony export */   $ZodEncodeError: () => (/* reexport safe */ _core_js__WEBPACK_IMPORTED_MODULE_0__.$ZodEncodeError),
/* harmony export */   $ZodEnum: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodEnum),
/* harmony export */   $ZodError: () => (/* reexport safe */ _errors_js__WEBPACK_IMPORTED_MODULE_2__.$ZodError),
/* harmony export */   $ZodFile: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodFile),
/* harmony export */   $ZodFunction: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodFunction),
/* harmony export */   $ZodGUID: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodGUID),
/* harmony export */   $ZodIPv4: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodIPv4),
/* harmony export */   $ZodIPv6: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodIPv6),
/* harmony export */   $ZodISODate: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodISODate),
/* harmony export */   $ZodISODateTime: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodISODateTime),
/* harmony export */   $ZodISODuration: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodISODuration),
/* harmony export */   $ZodISOTime: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodISOTime),
/* harmony export */   $ZodIntersection: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodIntersection),
/* harmony export */   $ZodJWT: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodJWT),
/* harmony export */   $ZodKSUID: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodKSUID),
/* harmony export */   $ZodLazy: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodLazy),
/* harmony export */   $ZodLiteral: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodLiteral),
/* harmony export */   $ZodMap: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodMap),
/* harmony export */   $ZodNaN: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodNaN),
/* harmony export */   $ZodNanoID: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodNanoID),
/* harmony export */   $ZodNever: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodNever),
/* harmony export */   $ZodNonOptional: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodNonOptional),
/* harmony export */   $ZodNull: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodNull),
/* harmony export */   $ZodNullable: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodNullable),
/* harmony export */   $ZodNumber: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodNumber),
/* harmony export */   $ZodNumberFormat: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodNumberFormat),
/* harmony export */   $ZodObject: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodObject),
/* harmony export */   $ZodObjectJIT: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodObjectJIT),
/* harmony export */   $ZodOptional: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodOptional),
/* harmony export */   $ZodPipe: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodPipe),
/* harmony export */   $ZodPrefault: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodPrefault),
/* harmony export */   $ZodPromise: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodPromise),
/* harmony export */   $ZodReadonly: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodReadonly),
/* harmony export */   $ZodRealError: () => (/* reexport safe */ _errors_js__WEBPACK_IMPORTED_MODULE_2__.$ZodRealError),
/* harmony export */   $ZodRecord: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodRecord),
/* harmony export */   $ZodRegistry: () => (/* reexport safe */ _registries_js__WEBPACK_IMPORTED_MODULE_9__.$ZodRegistry),
/* harmony export */   $ZodSet: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodSet),
/* harmony export */   $ZodString: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodString),
/* harmony export */   $ZodStringFormat: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodStringFormat),
/* harmony export */   $ZodSuccess: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodSuccess),
/* harmony export */   $ZodSymbol: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodSymbol),
/* harmony export */   $ZodTemplateLiteral: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodTemplateLiteral),
/* harmony export */   $ZodTransform: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodTransform),
/* harmony export */   $ZodTuple: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodTuple),
/* harmony export */   $ZodType: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodType),
/* harmony export */   $ZodULID: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodULID),
/* harmony export */   $ZodURL: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodURL),
/* harmony export */   $ZodUUID: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodUUID),
/* harmony export */   $ZodUndefined: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodUndefined),
/* harmony export */   $ZodUnion: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodUnion),
/* harmony export */   $ZodUnknown: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodUnknown),
/* harmony export */   $ZodVoid: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodVoid),
/* harmony export */   $ZodXID: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.$ZodXID),
/* harmony export */   $brand: () => (/* reexport safe */ _core_js__WEBPACK_IMPORTED_MODULE_0__.$brand),
/* harmony export */   $constructor: () => (/* reexport safe */ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor),
/* harmony export */   $input: () => (/* reexport safe */ _registries_js__WEBPACK_IMPORTED_MODULE_9__.$input),
/* harmony export */   $output: () => (/* reexport safe */ _registries_js__WEBPACK_IMPORTED_MODULE_9__.$output),
/* harmony export */   Doc: () => (/* reexport safe */ _doc_js__WEBPACK_IMPORTED_MODULE_10__.Doc),
/* harmony export */   JSONSchema: () => (/* reexport module object */ _json_schema_js__WEBPACK_IMPORTED_MODULE_13__),
/* harmony export */   JSONSchemaGenerator: () => (/* reexport safe */ _to_json_schema_js__WEBPACK_IMPORTED_MODULE_12__.JSONSchemaGenerator),
/* harmony export */   NEVER: () => (/* reexport safe */ _core_js__WEBPACK_IMPORTED_MODULE_0__.NEVER),
/* harmony export */   TimePrecision: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__.TimePrecision),
/* harmony export */   _any: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._any),
/* harmony export */   _array: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._array),
/* harmony export */   _base64: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._base64),
/* harmony export */   _base64url: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._base64url),
/* harmony export */   _bigint: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._bigint),
/* harmony export */   _boolean: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._boolean),
/* harmony export */   _catch: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._catch),
/* harmony export */   _check: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._check),
/* harmony export */   _cidrv4: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._cidrv4),
/* harmony export */   _cidrv6: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._cidrv6),
/* harmony export */   _coercedBigint: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._coercedBigint),
/* harmony export */   _coercedBoolean: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._coercedBoolean),
/* harmony export */   _coercedDate: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._coercedDate),
/* harmony export */   _coercedNumber: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._coercedNumber),
/* harmony export */   _coercedString: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._coercedString),
/* harmony export */   _cuid: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._cuid),
/* harmony export */   _cuid2: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._cuid2),
/* harmony export */   _custom: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._custom),
/* harmony export */   _date: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._date),
/* harmony export */   _decode: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_1__._decode),
/* harmony export */   _decodeAsync: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_1__._decodeAsync),
/* harmony export */   _default: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._default),
/* harmony export */   _discriminatedUnion: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._discriminatedUnion),
/* harmony export */   _e164: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._e164),
/* harmony export */   _email: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._email),
/* harmony export */   _emoji: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._emoji),
/* harmony export */   _encode: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_1__._encode),
/* harmony export */   _encodeAsync: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_1__._encodeAsync),
/* harmony export */   _endsWith: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._endsWith),
/* harmony export */   _enum: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._enum),
/* harmony export */   _file: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._file),
/* harmony export */   _float32: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._float32),
/* harmony export */   _float64: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._float64),
/* harmony export */   _gt: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._gt),
/* harmony export */   _gte: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._gte),
/* harmony export */   _guid: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._guid),
/* harmony export */   _includes: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._includes),
/* harmony export */   _int: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._int),
/* harmony export */   _int32: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._int32),
/* harmony export */   _int64: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._int64),
/* harmony export */   _intersection: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._intersection),
/* harmony export */   _ipv4: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._ipv4),
/* harmony export */   _ipv6: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._ipv6),
/* harmony export */   _isoDate: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._isoDate),
/* harmony export */   _isoDateTime: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._isoDateTime),
/* harmony export */   _isoDuration: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._isoDuration),
/* harmony export */   _isoTime: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._isoTime),
/* harmony export */   _jwt: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._jwt),
/* harmony export */   _ksuid: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._ksuid),
/* harmony export */   _lazy: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._lazy),
/* harmony export */   _length: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._length),
/* harmony export */   _literal: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._literal),
/* harmony export */   _lowercase: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._lowercase),
/* harmony export */   _lt: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._lt),
/* harmony export */   _lte: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._lte),
/* harmony export */   _map: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._map),
/* harmony export */   _max: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._max),
/* harmony export */   _maxLength: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._maxLength),
/* harmony export */   _maxSize: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._maxSize),
/* harmony export */   _mime: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._mime),
/* harmony export */   _min: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._min),
/* harmony export */   _minLength: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._minLength),
/* harmony export */   _minSize: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._minSize),
/* harmony export */   _multipleOf: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._multipleOf),
/* harmony export */   _nan: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._nan),
/* harmony export */   _nanoid: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._nanoid),
/* harmony export */   _nativeEnum: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._nativeEnum),
/* harmony export */   _negative: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._negative),
/* harmony export */   _never: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._never),
/* harmony export */   _nonnegative: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._nonnegative),
/* harmony export */   _nonoptional: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._nonoptional),
/* harmony export */   _nonpositive: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._nonpositive),
/* harmony export */   _normalize: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._normalize),
/* harmony export */   _null: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._null),
/* harmony export */   _nullable: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._nullable),
/* harmony export */   _number: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._number),
/* harmony export */   _optional: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._optional),
/* harmony export */   _overwrite: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._overwrite),
/* harmony export */   _parse: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_1__._parse),
/* harmony export */   _parseAsync: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_1__._parseAsync),
/* harmony export */   _pipe: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._pipe),
/* harmony export */   _positive: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._positive),
/* harmony export */   _promise: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._promise),
/* harmony export */   _property: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._property),
/* harmony export */   _readonly: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._readonly),
/* harmony export */   _record: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._record),
/* harmony export */   _refine: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._refine),
/* harmony export */   _regex: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._regex),
/* harmony export */   _safeDecode: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_1__._safeDecode),
/* harmony export */   _safeDecodeAsync: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_1__._safeDecodeAsync),
/* harmony export */   _safeEncode: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_1__._safeEncode),
/* harmony export */   _safeEncodeAsync: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_1__._safeEncodeAsync),
/* harmony export */   _safeParse: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_1__._safeParse),
/* harmony export */   _safeParseAsync: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_1__._safeParseAsync),
/* harmony export */   _set: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._set),
/* harmony export */   _size: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._size),
/* harmony export */   _startsWith: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._startsWith),
/* harmony export */   _string: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._string),
/* harmony export */   _stringFormat: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._stringFormat),
/* harmony export */   _stringbool: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._stringbool),
/* harmony export */   _success: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._success),
/* harmony export */   _superRefine: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._superRefine),
/* harmony export */   _symbol: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._symbol),
/* harmony export */   _templateLiteral: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._templateLiteral),
/* harmony export */   _toLowerCase: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._toLowerCase),
/* harmony export */   _toUpperCase: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._toUpperCase),
/* harmony export */   _transform: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._transform),
/* harmony export */   _trim: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._trim),
/* harmony export */   _tuple: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._tuple),
/* harmony export */   _uint32: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._uint32),
/* harmony export */   _uint64: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._uint64),
/* harmony export */   _ulid: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._ulid),
/* harmony export */   _undefined: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._undefined),
/* harmony export */   _union: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._union),
/* harmony export */   _unknown: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._unknown),
/* harmony export */   _uppercase: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._uppercase),
/* harmony export */   _url: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._url),
/* harmony export */   _uuid: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._uuid),
/* harmony export */   _uuidv4: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._uuidv4),
/* harmony export */   _uuidv6: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._uuidv6),
/* harmony export */   _uuidv7: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._uuidv7),
/* harmony export */   _void: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._void),
/* harmony export */   _xid: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_11__._xid),
/* harmony export */   clone: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.clone),
/* harmony export */   config: () => (/* reexport safe */ _core_js__WEBPACK_IMPORTED_MODULE_0__.config),
/* harmony export */   decode: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_1__.decode),
/* harmony export */   decodeAsync: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_1__.decodeAsync),
/* harmony export */   encode: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_1__.encode),
/* harmony export */   encodeAsync: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_1__.encodeAsync),
/* harmony export */   flattenError: () => (/* reexport safe */ _errors_js__WEBPACK_IMPORTED_MODULE_2__.flattenError),
/* harmony export */   formatError: () => (/* reexport safe */ _errors_js__WEBPACK_IMPORTED_MODULE_2__.formatError),
/* harmony export */   globalConfig: () => (/* reexport safe */ _core_js__WEBPACK_IMPORTED_MODULE_0__.globalConfig),
/* harmony export */   globalRegistry: () => (/* reexport safe */ _registries_js__WEBPACK_IMPORTED_MODULE_9__.globalRegistry),
/* harmony export */   isValidBase64: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.isValidBase64),
/* harmony export */   isValidBase64URL: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.isValidBase64URL),
/* harmony export */   isValidJWT: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_3__.isValidJWT),
/* harmony export */   locales: () => (/* reexport module object */ _locales_index_js__WEBPACK_IMPORTED_MODULE_8__),
/* harmony export */   parse: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_1__.parse),
/* harmony export */   parseAsync: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_1__.parseAsync),
/* harmony export */   prettifyError: () => (/* reexport safe */ _errors_js__WEBPACK_IMPORTED_MODULE_2__.prettifyError),
/* harmony export */   regexes: () => (/* reexport module object */ _regexes_js__WEBPACK_IMPORTED_MODULE_7__),
/* harmony export */   registry: () => (/* reexport safe */ _registries_js__WEBPACK_IMPORTED_MODULE_9__.registry),
/* harmony export */   safeDecode: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_1__.safeDecode),
/* harmony export */   safeDecodeAsync: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_1__.safeDecodeAsync),
/* harmony export */   safeEncode: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_1__.safeEncode),
/* harmony export */   safeEncodeAsync: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_1__.safeEncodeAsync),
/* harmony export */   safeParse: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_1__.safeParse),
/* harmony export */   safeParseAsync: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_1__.safeParseAsync),
/* harmony export */   toDotPath: () => (/* reexport safe */ _errors_js__WEBPACK_IMPORTED_MODULE_2__.toDotPath),
/* harmony export */   toJSONSchema: () => (/* reexport safe */ _to_json_schema_js__WEBPACK_IMPORTED_MODULE_12__.toJSONSchema),
/* harmony export */   treeifyError: () => (/* reexport safe */ _errors_js__WEBPACK_IMPORTED_MODULE_2__.treeifyError),
/* harmony export */   util: () => (/* reexport module object */ _util_js__WEBPACK_IMPORTED_MODULE_6__),
/* harmony export */   version: () => (/* reexport safe */ _versions_js__WEBPACK_IMPORTED_MODULE_5__.version)
/* harmony export */ });
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7476);
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8308);
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2404);
/* harmony import */ var _schemas_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2151);
/* harmony import */ var _checks_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8250);
/* harmony import */ var _versions_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7942);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4995);
/* harmony import */ var _regexes_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2996);
/* harmony import */ var _locales_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9719);
/* harmony import */ var _registries_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1732);
/* harmony import */ var _doc_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(201);
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(463);
/* harmony import */ var _to_json_schema_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(8821);
/* harmony import */ var _json_schema_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(2849);
















/***/ }),

/***/ 3487:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "caracteres", verb: "tener" },
        file: { unit: "bytes", verb: "tener" },
        array: { unit: "elementos", verb: "tener" },
        set: { unit: "elementos", verb: "tener" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "número";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "arreglo";
                }
                if (data === null) {
                    return "nulo";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "entrada",
        email: "dirección de correo electrónico",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "fecha y hora ISO",
        date: "fecha ISO",
        time: "hora ISO",
        duration: "duración ISO",
        ipv4: "dirección IPv4",
        ipv6: "dirección IPv6",
        cidrv4: "rango IPv4",
        cidrv6: "rango IPv6",
        base64: "cadena codificada en base64",
        base64url: "URL codificada en base64",
        json_string: "cadena JSON",
        e164: "número E.164",
        jwt: "JWT",
        template_literal: "entrada",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Entrada inválida: se esperaba ${issue.expected}, recibido ${parsedType(issue.input)}`;
            // return `Entrada inválida: se esperaba ${issue.expected}, recibido ${util.getParsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Entrada inválida: se esperaba ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Opción inválida: se esperaba una de ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Demasiado grande: se esperaba que ${issue.origin ?? "valor"} tuviera ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementos"}`;
                return `Demasiado grande: se esperaba que ${issue.origin ?? "valor"} fuera ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Demasiado pequeño: se esperaba que ${issue.origin} tuviera ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `Demasiado pequeño: se esperaba que ${issue.origin} fuera ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `Cadena inválida: debe comenzar con "${_issue.prefix}"`;
                if (_issue.format === "ends_with")
                    return `Cadena inválida: debe terminar en "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Cadena inválida: debe incluir "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Cadena inválida: debe coincidir con el patrón ${_issue.pattern}`;
                return `Inválido ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Número inválido: debe ser múltiplo de ${issue.divisor}`;
            case "unrecognized_keys":
                return `Llave${issue.keys.length > 1 ? "s" : ""} desconocida${issue.keys.length > 1 ? "s" : ""}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Llave inválida en ${issue.origin}`;
            case "invalid_union":
                return "Entrada inválida";
            case "invalid_element":
                return `Valor inválido en ${issue.origin}`;
            default:
                return `Entrada inválida`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 3855:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bigint: () => (/* binding */ bigint),
/* harmony export */   boolean: () => (/* binding */ boolean),
/* harmony export */   date: () => (/* binding */ date),
/* harmony export */   number: () => (/* binding */ number),
/* harmony export */   string: () => (/* binding */ string)
/* harmony export */ });
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3259);
/* harmony import */ var _schemas_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2308);


function string(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._coercedString(_schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodString, params);
}
function number(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._coercedNumber(_schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodNumber, params);
}
function boolean(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._coercedBoolean(_schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodBoolean, params);
}
function bigint(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._coercedBigint(_schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodBigInt, params);
}
function date(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._coercedDate(_schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodDate, params);
}


/***/ }),

/***/ 3879:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "ตัวอักษร", verb: "ควรมี" },
        file: { unit: "ไบต์", verb: "ควรมี" },
        array: { unit: "รายการ", verb: "ควรมี" },
        set: { unit: "รายการ", verb: "ควรมี" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "ไม่ใช่ตัวเลข (NaN)" : "ตัวเลข";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "อาร์เรย์ (Array)";
                }
                if (data === null) {
                    return "ไม่มีค่า (null)";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "ข้อมูลที่ป้อน",
        email: "ที่อยู่อีเมล",
        url: "URL",
        emoji: "อิโมจิ",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "วันที่เวลาแบบ ISO",
        date: "วันที่แบบ ISO",
        time: "เวลาแบบ ISO",
        duration: "ช่วงเวลาแบบ ISO",
        ipv4: "ที่อยู่ IPv4",
        ipv6: "ที่อยู่ IPv6",
        cidrv4: "ช่วง IP แบบ IPv4",
        cidrv6: "ช่วง IP แบบ IPv6",
        base64: "ข้อความแบบ Base64",
        base64url: "ข้อความแบบ Base64 สำหรับ URL",
        json_string: "ข้อความแบบ JSON",
        e164: "เบอร์โทรศัพท์ระหว่างประเทศ (E.164)",
        jwt: "โทเคน JWT",
        template_literal: "ข้อมูลที่ป้อน",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น ${issue.expected} แต่ได้รับ ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `ค่าไม่ถูกต้อง: ควรเป็น ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `ตัวเลือกไม่ถูกต้อง: ควรเป็นหนึ่งใน ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "ไม่เกิน" : "น้อยกว่า";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `เกินกำหนด: ${issue.origin ?? "ค่า"} ควรมี${adj} ${issue.maximum.toString()} ${sizing.unit ?? "รายการ"}`;
                return `เกินกำหนด: ${issue.origin ?? "ค่า"} ควรมี${adj} ${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? "อย่างน้อย" : "มากกว่า";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `น้อยกว่ากำหนด: ${issue.origin} ควรมี${adj} ${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `น้อยกว่ากำหนด: ${issue.origin} ควรมี${adj} ${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with") {
                    return `รูปแบบไม่ถูกต้อง: ข้อความต้องขึ้นต้นด้วย "${_issue.prefix}"`;
                }
                if (_issue.format === "ends_with")
                    return `รูปแบบไม่ถูกต้อง: ข้อความต้องลงท้ายด้วย "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `รูปแบบไม่ถูกต้อง: ข้อความต้องมี "${_issue.includes}" อยู่ในข้อความ`;
                if (_issue.format === "regex")
                    return `รูปแบบไม่ถูกต้อง: ต้องตรงกับรูปแบบที่กำหนด ${_issue.pattern}`;
                return `รูปแบบไม่ถูกต้อง: ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `ตัวเลขไม่ถูกต้อง: ต้องเป็นจำนวนที่หารด้วย ${issue.divisor} ได้ลงตัว`;
            case "unrecognized_keys":
                return `พบคีย์ที่ไม่รู้จัก: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `คีย์ไม่ถูกต้องใน ${issue.origin}`;
            case "invalid_union":
                return "ข้อมูลไม่ถูกต้อง: ไม่ตรงกับรูปแบบยูเนียนที่กำหนดไว้";
            case "invalid_element":
                return `ข้อมูลไม่ถูกต้องใน ${issue.origin}`;
            default:
                return `ข้อมูลไม่ถูกต้อง`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 4011:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "caràcters", verb: "contenir" },
        file: { unit: "bytes", verb: "contenir" },
        array: { unit: "elements", verb: "contenir" },
        set: { unit: "elements", verb: "contenir" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "number";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "array";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "entrada",
        email: "adreça electrònica",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "data i hora ISO",
        date: "data ISO",
        time: "hora ISO",
        duration: "durada ISO",
        ipv4: "adreça IPv4",
        ipv6: "adreça IPv6",
        cidrv4: "rang IPv4",
        cidrv6: "rang IPv6",
        base64: "cadena codificada en base64",
        base64url: "cadena codificada en base64url",
        json_string: "cadena JSON",
        e164: "número E.164",
        jwt: "JWT",
        template_literal: "entrada",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Tipus invàlid: s'esperava ${issue.expected}, s'ha rebut ${parsedType(issue.input)}`;
            // return `Tipus invàlid: s'esperava ${issue.expected}, s'ha rebut ${util.getParsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Valor invàlid: s'esperava ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Opció invàlida: s'esperava una de ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, " o ")}`;
            case "too_big": {
                const adj = issue.inclusive ? "com a màxim" : "menys de";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Massa gran: s'esperava que ${issue.origin ?? "el valor"} contingués ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
                return `Massa gran: s'esperava que ${issue.origin ?? "el valor"} fos ${adj} ${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? "com a mínim" : "més de";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Massa petit: s'esperava que ${issue.origin} contingués ${adj} ${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `Massa petit: s'esperava que ${issue.origin} fos ${adj} ${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with") {
                    return `Format invàlid: ha de començar amb "${_issue.prefix}"`;
                }
                if (_issue.format === "ends_with")
                    return `Format invàlid: ha d'acabar amb "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Format invàlid: ha d'incloure "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Format invàlid: ha de coincidir amb el patró ${_issue.pattern}`;
                return `Format invàlid per a ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Número invàlid: ha de ser múltiple de ${issue.divisor}`;
            case "unrecognized_keys":
                return `Clau${issue.keys.length > 1 ? "s" : ""} no reconeguda${issue.keys.length > 1 ? "s" : ""}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Clau invàlida a ${issue.origin}`;
            case "invalid_union":
                return "Entrada invàlida"; // Could also be "Tipus d'unió invàlid" but "Entrada invàlida" is more general
            case "invalid_element":
                return `Element invàlid a ${issue.origin}`;
            default:
                return `Entrada invàlida`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 4104:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "tegn", verb: "havde" },
        file: { unit: "bytes", verb: "havde" },
        array: { unit: "elementer", verb: "indeholdt" },
        set: { unit: "elementer", verb: "indeholdt" },
    };
    const TypeNames = {
        string: "streng",
        number: "tal",
        boolean: "boolean",
        array: "liste",
        object: "objekt",
        set: "sæt",
        file: "fil",
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    function getTypeName(type) {
        return TypeNames[type] ?? type;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "tal";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "liste";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
                return "objekt";
            }
        }
        return t;
    };
    const Nouns = {
        regex: "input",
        email: "e-mailadresse",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO dato- og klokkeslæt",
        date: "ISO-dato",
        time: "ISO-klokkeslæt",
        duration: "ISO-varighed",
        ipv4: "IPv4-område",
        ipv6: "IPv6-område",
        cidrv4: "IPv4-spektrum",
        cidrv6: "IPv6-spektrum",
        base64: "base64-kodet streng",
        base64url: "base64url-kodet streng",
        json_string: "JSON-streng",
        e164: "E.164-nummer",
        jwt: "JWT",
        template_literal: "input",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Ugyldigt input: forventede ${getTypeName(issue.expected)}, fik ${getTypeName(parsedType(issue.input))}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Ugyldig værdi: forventede ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Ugyldigt valg: forventede en af følgende ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                const origin = getTypeName(issue.origin);
                if (sizing)
                    return `For stor: forventede ${origin ?? "value"} ${sizing.verb} ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "elementer"}`;
                return `For stor: forventede ${origin ?? "value"} havde ${adj} ${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                const origin = getTypeName(issue.origin);
                if (sizing) {
                    return `For lille: forventede ${origin} ${sizing.verb} ${adj} ${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `For lille: forventede ${origin} havde ${adj} ${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `Ugyldig streng: skal starte med "${_issue.prefix}"`;
                if (_issue.format === "ends_with")
                    return `Ugyldig streng: skal ende med "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Ugyldig streng: skal indeholde "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Ugyldig streng: skal matche mønsteret ${_issue.pattern}`;
                return `Ugyldig ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Ugyldigt tal: skal være deleligt med ${issue.divisor}`;
            case "unrecognized_keys":
                return `${issue.keys.length > 1 ? "Ukendte nøgler" : "Ukendt nøgle"}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Ugyldig nøgle i ${issue.origin}`;
            case "invalid_union":
                return "Ugyldigt input: matcher ingen af de tilladte typer";
            case "invalid_element":
                return `Ugyldig værdi i ${issue.origin}`;
            default:
                return `Ugyldigt input`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 4240:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "tegn", verb: "å ha" },
        file: { unit: "bytes", verb: "å ha" },
        array: { unit: "elementer", verb: "å inneholde" },
        set: { unit: "elementer", verb: "å inneholde" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "tall";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "liste";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "input",
        email: "e-postadresse",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO dato- og klokkeslett",
        date: "ISO-dato",
        time: "ISO-klokkeslett",
        duration: "ISO-varighet",
        ipv4: "IPv4-område",
        ipv6: "IPv6-område",
        cidrv4: "IPv4-spekter",
        cidrv6: "IPv6-spekter",
        base64: "base64-enkodet streng",
        base64url: "base64url-enkodet streng",
        json_string: "JSON-streng",
        e164: "E.164-nummer",
        jwt: "JWT",
        template_literal: "input",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Ugyldig input: forventet ${issue.expected}, fikk ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Ugyldig verdi: forventet ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Ugyldig valg: forventet en av ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `For stor(t): forventet ${issue.origin ?? "value"} til å ha ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementer"}`;
                return `For stor(t): forventet ${issue.origin ?? "value"} til å ha ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `For lite(n): forventet ${issue.origin} til å ha ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `For lite(n): forventet ${issue.origin} til å ha ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `Ugyldig streng: må starte med "${_issue.prefix}"`;
                if (_issue.format === "ends_with")
                    return `Ugyldig streng: må ende med "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Ugyldig streng: må inneholde "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Ugyldig streng: må matche mønsteret ${_issue.pattern}`;
                return `Ugyldig ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Ugyldig tall: må være et multiplum av ${issue.divisor}`;
            case "unrecognized_keys":
                return `${issue.keys.length > 1 ? "Ukjente nøkler" : "Ukjent nøkkel"}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Ugyldig nøkkel i ${issue.origin}`;
            case "invalid_union":
                return "Ugyldig input";
            case "invalid_element":
                return `Ugyldig verdi i ${issue.origin}`;
            default:
                return `Ugyldig input`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 4311:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "aksara", verb: "mempunyai" },
        file: { unit: "bait", verb: "mempunyai" },
        array: { unit: "elemen", verb: "mempunyai" },
        set: { unit: "elemen", verb: "mempunyai" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "nombor";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "array";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "input",
        email: "alamat e-mel",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "tarikh masa ISO",
        date: "tarikh ISO",
        time: "masa ISO",
        duration: "tempoh ISO",
        ipv4: "alamat IPv4",
        ipv6: "alamat IPv6",
        cidrv4: "julat IPv4",
        cidrv6: "julat IPv6",
        base64: "string dikodkan base64",
        base64url: "string dikodkan base64url",
        json_string: "string JSON",
        e164: "nombor E.164",
        jwt: "JWT",
        template_literal: "input",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Input tidak sah: dijangka ${issue.expected}, diterima ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Input tidak sah: dijangka ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Pilihan tidak sah: dijangka salah satu daripada ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Terlalu besar: dijangka ${issue.origin ?? "nilai"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elemen"}`;
                return `Terlalu besar: dijangka ${issue.origin ?? "nilai"} adalah ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Terlalu kecil: dijangka ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `Terlalu kecil: dijangka ${issue.origin} adalah ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `String tidak sah: mesti bermula dengan "${_issue.prefix}"`;
                if (_issue.format === "ends_with")
                    return `String tidak sah: mesti berakhir dengan "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `String tidak sah: mesti mengandungi "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `String tidak sah: mesti sepadan dengan corak ${_issue.pattern}`;
                return `${Nouns[_issue.format] ?? issue.format} tidak sah`;
            }
            case "not_multiple_of":
                return `Nombor tidak sah: perlu gandaan ${issue.divisor}`;
            case "unrecognized_keys":
                return `Kunci tidak dikenali: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Kunci tidak sah dalam ${issue.origin}`;
            case "invalid_union":
                return "Input tidak sah";
            case "invalid_element":
                return `Nilai tidak sah dalam ${issue.origin}`;
            default:
                return `Input tidak sah`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 4370:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "karakter", verb: "memiliki" },
        file: { unit: "byte", verb: "memiliki" },
        array: { unit: "item", verb: "memiliki" },
        set: { unit: "item", verb: "memiliki" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "number";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "array";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "input",
        email: "alamat email",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "tanggal dan waktu format ISO",
        date: "tanggal format ISO",
        time: "jam format ISO",
        duration: "durasi format ISO",
        ipv4: "alamat IPv4",
        ipv6: "alamat IPv6",
        cidrv4: "rentang alamat IPv4",
        cidrv6: "rentang alamat IPv6",
        base64: "string dengan enkode base64",
        base64url: "string dengan enkode base64url",
        json_string: "string JSON",
        e164: "angka E.164",
        jwt: "JWT",
        template_literal: "input",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Input tidak valid: diharapkan ${issue.expected}, diterima ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Input tidak valid: diharapkan ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Pilihan tidak valid: diharapkan salah satu dari ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Terlalu besar: diharapkan ${issue.origin ?? "value"} memiliki ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elemen"}`;
                return `Terlalu besar: diharapkan ${issue.origin ?? "value"} menjadi ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Terlalu kecil: diharapkan ${issue.origin} memiliki ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `Terlalu kecil: diharapkan ${issue.origin} menjadi ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `String tidak valid: harus dimulai dengan "${_issue.prefix}"`;
                if (_issue.format === "ends_with")
                    return `String tidak valid: harus berakhir dengan "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `String tidak valid: harus menyertakan "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `String tidak valid: harus sesuai pola ${_issue.pattern}`;
                return `${Nouns[_issue.format] ?? issue.format} tidak valid`;
            }
            case "not_multiple_of":
                return `Angka tidak valid: harus kelipatan dari ${issue.divisor}`;
            case "unrecognized_keys":
                return `Kunci tidak dikenali ${issue.keys.length > 1 ? "s" : ""}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Kunci tidak valid di ${issue.origin}`;
            case "invalid_union":
                return "Input tidak valid";
            case "invalid_element":
                return `Nilai tidak valid di ${issue.origin}`;
            default:
                return `Input tidak valid`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 4458:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LifecycleManager: () => (/* binding */ LifecycleManager),
/* harmony export */   lifecycleManager: () => (/* binding */ lifecycleManager)
/* harmony export */ });
/* harmony import */ var _menuSystem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2790);
/* harmony import */ var _promptManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1223);
/* harmony import */ var _globalState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5518);




// Lifecycle management using jQuery
class LifecycleManager {
    static instance;
    initialized = false;
    constructor() { }
    static getInstance() {
        if (!LifecycleManager.instance) {
            LifecycleManager.instance = new LifecycleManager();
        }
        return LifecycleManager.instance;
    }
    // Initialize the script
    initialize() {
        if (this.initialized) {
            console.log('[ALRIC] Script already initialized, skipping...');
            return;
        }
        // Use jQuery for DOM ready event (not DOMContentLoaded)
        $(() => {
            this.onLoad();
        });
        // Use jQuery for page hide event (unload)
        $(window).on('pagehide', () => {
            this.onUnload();
        });
        this.initialized = true;
    }
    // Load handler
    onLoad() {
        console.log('🎮 ALARIC NSFW ENGINE + MVU 控制台已加载 (TypeScript重构版本)');
        // Show main button
        _menuSystem__WEBPACK_IMPORTED_MODULE_0__.menuSystem.closeConsole();
        // Clear any existing injections on load
        setTimeout(() => {
            _promptManager__WEBPACK_IMPORTED_MODULE_1__.promptManager.clearAllInjectedPrompts();
            _promptManager__WEBPACK_IMPORTED_MODULE_1__.promptManager.clearDailyInjections();
            console.log('[ALRIC] 已清除所有缓存的注入内容');
        }, 500);
        // Bind event handlers
        this.bindEventHandlers();
        console.log('✨ 支持系统提示词注入模式：使用injectPrompts API');
        console.log('[NSFW引擎] API检查 - injectPrompts:', typeof injectPrompts);
        console.log('[NSFW引擎] API检查 - uninjectPrompts:', typeof uninjectPrompts);
        // Show success notification
        _globalState__WEBPACK_IMPORTED_MODULE_2__.DomUtils.showNotification('🎮 ALARIC系统已就绪', 'success');
    }
    // Unload handler
    onUnload() {
        console.log('[ALRIC] Script unloading...');
        // Clean up injections
        _promptManager__WEBPACK_IMPORTED_MODULE_1__.promptManager.clearAllInjectedPrompts();
        _promptManager__WEBPACK_IMPORTED_MODULE_1__.promptManager.clearDailyInjections();
        // Reset global state
        _globalState__WEBPACK_IMPORTED_MODULE_2__.globalState.setState({
            ALARIC_CURRENT_SOP: null,
            ALARIC_CURRENT_SOP_ID: null,
            ALARIC_CURRENT_SPICE: null,
            ALARIC_SOP_ACTIVE: false,
            ALARIC_AFTERCARE_INJECTED: false,
        });
        console.log('[ALRIC] Script unloaded successfully');
    }
    // Bind all event handlers
    bindEventHandlers() {
        // Import event handlers dynamically to avoid circular dependencies
        __webpack_require__.e(/* import() */ 555).then(__webpack_require__.bind(__webpack_require__, 4555)).then(({ eventHandlers }) => {
            // Main menu buttons
            this.bindButtonEvent('🎮 MVU 主控台', () => eventHandlers.handleMainConsole());
            this.bindButtonEvent('🎲 玩法', () => eventHandlers.handlePlayMenu());
            this.bindButtonEvent('👤 身份', () => eventHandlers.handleIdentityMenu());
            this.bindButtonEvent('🔄 强刷', () => eventHandlers.handleRefreshPage());
            this.bindButtonEvent('❌ 关闭', () => eventHandlers.handleCloseConsole());
            // Play menu buttons
            this.bindButtonEvent('🔞 NSFW', () => eventHandlers.handleNsfwToggle());
            this.bindButtonEvent('📅 今日重点', () => eventHandlers.handleTodayFocus());
            this.bindButtonEvent('🎲 摇点主菜', () => eventHandlers.handleRollMainDish());
            this.bindButtonEvent('🍅 加点佐料', () => eventHandlers.handleAddSpice());
            this.bindButtonEvent('🏁 结束玩法', () => eventHandlers.handleEndPlay());
            this.bindButtonEvent('👁️ 查看注入', () => eventHandlers.handleViewInjections());
            // Identity menu buttons
            this.bindButtonEvent('📊 状态', () => eventHandlers.handleStatusCheck());
            this.bindButtonEvent('🛡️ 安全协议', () => eventHandlers.handleSafetyProtocol());
            this.bindButtonEvent('🆔 身份', () => eventHandlers.handleIdentityEdit());
            this.bindButtonEvent('🔀 阶段', () => eventHandlers.handleStageSwitch());
            this.bindButtonEvent('❤️ XP', () => eventHandlers.handleXpEdit());
            // Return buttons
            this.bindButtonEvent('🔙 返回', () => eventHandlers.handleReturnToMain());
            console.log('[ALRIC] Event handlers bound successfully');
        }).catch(error => {
            console.error('[ALRIC] Failed to bind event handlers:', error);
        });
    }
    // Bind button event using Tavern Helper API
    bindButtonEvent(buttonName, handler) {
        if (typeof eventOn === 'function' && typeof getButtonEvent === 'function') {
            try {
                eventOn(getButtonEvent(buttonName), handler);
            }
            catch (error) {
                console.warn(`[ALRIC] Failed to bind event for button "${buttonName}":`, error);
            }
        }
        else {
            console.warn('[ALRIC] eventOn or getButtonEvent API not available');
        }
    }
}
// Export singleton instance
const lifecycleManager = LifecycleManager.getInstance();


/***/ }),

/***/ 4572:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "حرف", verb: "أن يحوي" },
        file: { unit: "بايت", verb: "أن يحوي" },
        array: { unit: "عنصر", verb: "أن يحوي" },
        set: { unit: "عنصر", verb: "أن يحوي" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "number";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "array";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "مدخل",
        email: "بريد إلكتروني",
        url: "رابط",
        emoji: "إيموجي",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "تاريخ ووقت بمعيار ISO",
        date: "تاريخ بمعيار ISO",
        time: "وقت بمعيار ISO",
        duration: "مدة بمعيار ISO",
        ipv4: "عنوان IPv4",
        ipv6: "عنوان IPv6",
        cidrv4: "مدى عناوين بصيغة IPv4",
        cidrv6: "مدى عناوين بصيغة IPv6",
        base64: "نَص بترميز base64-encoded",
        base64url: "نَص بترميز base64url-encoded",
        json_string: "نَص على هيئة JSON",
        e164: "رقم هاتف بمعيار E.164",
        jwt: "JWT",
        template_literal: "مدخل",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `مدخلات غير مقبولة: يفترض إدخال ${issue.expected}، ولكن تم إدخال ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `مدخلات غير مقبولة: يفترض إدخال ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `اختيار غير مقبول: يتوقع انتقاء أحد هذه الخيارات: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return ` أكبر من اللازم: يفترض أن تكون ${issue.origin ?? "القيمة"} ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "عنصر"}`;
                return `أكبر من اللازم: يفترض أن تكون ${issue.origin ?? "القيمة"} ${adj} ${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `أصغر من اللازم: يفترض لـ ${issue.origin} أن يكون ${adj} ${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `أصغر من اللازم: يفترض لـ ${issue.origin} أن يكون ${adj} ${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `نَص غير مقبول: يجب أن يبدأ بـ "${issue.prefix}"`;
                if (_issue.format === "ends_with")
                    return `نَص غير مقبول: يجب أن ينتهي بـ "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `نَص غير مقبول: يجب أن يتضمَّن "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `نَص غير مقبول: يجب أن يطابق النمط ${_issue.pattern}`;
                return `${Nouns[_issue.format] ?? issue.format} غير مقبول`;
            }
            case "not_multiple_of":
                return `رقم غير مقبول: يجب أن يكون من مضاعفات ${issue.divisor}`;
            case "unrecognized_keys":
                return `معرف${issue.keys.length > 1 ? "ات" : ""} غريب${issue.keys.length > 1 ? "ة" : ""}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, "، ")}`;
            case "invalid_key":
                return `معرف غير مقبول في ${issue.origin}`;
            case "invalid_union":
                return "مدخل غير مقبول";
            case "invalid_element":
                return `مدخل غير مقبول في ${issue.origin}`;
            default:
                return "مدخل غير مقبول";
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 4920:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "caractères", verb: "avoir" },
        file: { unit: "octets", verb: "avoir" },
        array: { unit: "éléments", verb: "avoir" },
        set: { unit: "éléments", verb: "avoir" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "number";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "array";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "entrée",
        email: "adresse courriel",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "date-heure ISO",
        date: "date ISO",
        time: "heure ISO",
        duration: "durée ISO",
        ipv4: "adresse IPv4",
        ipv6: "adresse IPv6",
        cidrv4: "plage IPv4",
        cidrv6: "plage IPv6",
        base64: "chaîne encodée en base64",
        base64url: "chaîne encodée en base64url",
        json_string: "chaîne JSON",
        e164: "numéro E.164",
        jwt: "JWT",
        template_literal: "entrée",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Entrée invalide : attendu ${issue.expected}, reçu ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Entrée invalide : attendu ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Option invalide : attendu l'une des valeurs suivantes ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "≤" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Trop grand : attendu que ${issue.origin ?? "la valeur"} ait ${adj}${issue.maximum.toString()} ${sizing.unit}`;
                return `Trop grand : attendu que ${issue.origin ?? "la valeur"} soit ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? "≥" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Trop petit : attendu que ${issue.origin} ait ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `Trop petit : attendu que ${issue.origin} soit ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with") {
                    return `Chaîne invalide : doit commencer par "${_issue.prefix}"`;
                }
                if (_issue.format === "ends_with")
                    return `Chaîne invalide : doit se terminer par "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Chaîne invalide : doit inclure "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Chaîne invalide : doit correspondre au motif ${_issue.pattern}`;
                return `${Nouns[_issue.format] ?? issue.format} invalide`;
            }
            case "not_multiple_of":
                return `Nombre invalide : doit être un multiple de ${issue.divisor}`;
            case "unrecognized_keys":
                return `Clé${issue.keys.length > 1 ? "s" : ""} non reconnue${issue.keys.length > 1 ? "s" : ""} : ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Clé invalide dans ${issue.origin}`;
            case "invalid_union":
                return "Entrée invalide";
            case "invalid_element":
                return `Valeur invalide dans ${issue.origin}`;
            default:
                return `Entrée invalide`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 4995:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BIGINT_FORMAT_RANGES: () => (/* binding */ BIGINT_FORMAT_RANGES),
/* harmony export */   Class: () => (/* binding */ Class),
/* harmony export */   NUMBER_FORMAT_RANGES: () => (/* binding */ NUMBER_FORMAT_RANGES),
/* harmony export */   aborted: () => (/* binding */ aborted),
/* harmony export */   allowsEval: () => (/* binding */ allowsEval),
/* harmony export */   assert: () => (/* binding */ assert),
/* harmony export */   assertEqual: () => (/* binding */ assertEqual),
/* harmony export */   assertIs: () => (/* binding */ assertIs),
/* harmony export */   assertNever: () => (/* binding */ assertNever),
/* harmony export */   assertNotEqual: () => (/* binding */ assertNotEqual),
/* harmony export */   assignProp: () => (/* binding */ assignProp),
/* harmony export */   base64ToUint8Array: () => (/* binding */ base64ToUint8Array),
/* harmony export */   base64urlToUint8Array: () => (/* binding */ base64urlToUint8Array),
/* harmony export */   cached: () => (/* binding */ cached),
/* harmony export */   captureStackTrace: () => (/* binding */ captureStackTrace),
/* harmony export */   cleanEnum: () => (/* binding */ cleanEnum),
/* harmony export */   cleanRegex: () => (/* binding */ cleanRegex),
/* harmony export */   clone: () => (/* binding */ clone),
/* harmony export */   cloneDef: () => (/* binding */ cloneDef),
/* harmony export */   createTransparentProxy: () => (/* binding */ createTransparentProxy),
/* harmony export */   defineLazy: () => (/* binding */ defineLazy),
/* harmony export */   esc: () => (/* binding */ esc),
/* harmony export */   escapeRegex: () => (/* binding */ escapeRegex),
/* harmony export */   extend: () => (/* binding */ extend),
/* harmony export */   finalizeIssue: () => (/* binding */ finalizeIssue),
/* harmony export */   floatSafeRemainder: () => (/* binding */ floatSafeRemainder),
/* harmony export */   getElementAtPath: () => (/* binding */ getElementAtPath),
/* harmony export */   getEnumValues: () => (/* binding */ getEnumValues),
/* harmony export */   getLengthableOrigin: () => (/* binding */ getLengthableOrigin),
/* harmony export */   getParsedType: () => (/* binding */ getParsedType),
/* harmony export */   getSizableOrigin: () => (/* binding */ getSizableOrigin),
/* harmony export */   hexToUint8Array: () => (/* binding */ hexToUint8Array),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isPlainObject: () => (/* binding */ isPlainObject),
/* harmony export */   issue: () => (/* binding */ issue),
/* harmony export */   joinValues: () => (/* binding */ joinValues),
/* harmony export */   jsonStringifyReplacer: () => (/* binding */ jsonStringifyReplacer),
/* harmony export */   merge: () => (/* binding */ merge),
/* harmony export */   mergeDefs: () => (/* binding */ mergeDefs),
/* harmony export */   normalizeParams: () => (/* binding */ normalizeParams),
/* harmony export */   nullish: () => (/* binding */ nullish),
/* harmony export */   numKeys: () => (/* binding */ numKeys),
/* harmony export */   objectClone: () => (/* binding */ objectClone),
/* harmony export */   omit: () => (/* binding */ omit),
/* harmony export */   optionalKeys: () => (/* binding */ optionalKeys),
/* harmony export */   partial: () => (/* binding */ partial),
/* harmony export */   pick: () => (/* binding */ pick),
/* harmony export */   prefixIssues: () => (/* binding */ prefixIssues),
/* harmony export */   primitiveTypes: () => (/* binding */ primitiveTypes),
/* harmony export */   promiseAllObject: () => (/* binding */ promiseAllObject),
/* harmony export */   propertyKeyTypes: () => (/* binding */ propertyKeyTypes),
/* harmony export */   randomString: () => (/* binding */ randomString),
/* harmony export */   required: () => (/* binding */ required),
/* harmony export */   safeExtend: () => (/* binding */ safeExtend),
/* harmony export */   shallowClone: () => (/* binding */ shallowClone),
/* harmony export */   stringifyPrimitive: () => (/* binding */ stringifyPrimitive),
/* harmony export */   uint8ArrayToBase64: () => (/* binding */ uint8ArrayToBase64),
/* harmony export */   uint8ArrayToBase64url: () => (/* binding */ uint8ArrayToBase64url),
/* harmony export */   uint8ArrayToHex: () => (/* binding */ uint8ArrayToHex),
/* harmony export */   unwrapMessage: () => (/* binding */ unwrapMessage)
/* harmony export */ });
// functions
function assertEqual(val) {
    return val;
}
function assertNotEqual(val) {
    return val;
}
function assertIs(_arg) { }
function assertNever(_x) {
    throw new Error();
}
function assert(_) { }
function getEnumValues(entries) {
    const numericValues = Object.values(entries).filter((v) => typeof v === "number");
    const values = Object.entries(entries)
        .filter(([k, _]) => numericValues.indexOf(+k) === -1)
        .map(([_, v]) => v);
    return values;
}
function joinValues(array, separator = "|") {
    return array.map((val) => stringifyPrimitive(val)).join(separator);
}
function jsonStringifyReplacer(_, value) {
    if (typeof value === "bigint")
        return value.toString();
    return value;
}
function cached(getter) {
    const set = false;
    return {
        get value() {
            if (!set) {
                const value = getter();
                Object.defineProperty(this, "value", { value });
                return value;
            }
            throw new Error("cached value already set");
        },
    };
}
function nullish(input) {
    return input === null || input === undefined;
}
function cleanRegex(source) {
    const start = source.startsWith("^") ? 1 : 0;
    const end = source.endsWith("$") ? source.length - 1 : source.length;
    return source.slice(start, end);
}
function floatSafeRemainder(val, step) {
    const valDecCount = (val.toString().split(".")[1] || "").length;
    const stepString = step.toString();
    let stepDecCount = (stepString.split(".")[1] || "").length;
    if (stepDecCount === 0 && /\d?e-\d?/.test(stepString)) {
        const match = stepString.match(/\d?e-(\d?)/);
        if (match?.[1]) {
            stepDecCount = Number.parseInt(match[1]);
        }
    }
    const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
    const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
    const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
    return (valInt % stepInt) / 10 ** decCount;
}
const EVALUATING = Symbol("evaluating");
function defineLazy(object, key, getter) {
    let value = undefined;
    Object.defineProperty(object, key, {
        get() {
            if (value === EVALUATING) {
                // Circular reference detected, return undefined to break the cycle
                return undefined;
            }
            if (value === undefined) {
                value = EVALUATING;
                value = getter();
            }
            return value;
        },
        set(v) {
            Object.defineProperty(object, key, {
                value: v,
                // configurable: true,
            });
            // object[key] = v;
        },
        configurable: true,
    });
}
function objectClone(obj) {
    return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
}
function assignProp(target, prop, value) {
    Object.defineProperty(target, prop, {
        value,
        writable: true,
        enumerable: true,
        configurable: true,
    });
}
function mergeDefs(...defs) {
    const mergedDescriptors = {};
    for (const def of defs) {
        const descriptors = Object.getOwnPropertyDescriptors(def);
        Object.assign(mergedDescriptors, descriptors);
    }
    return Object.defineProperties({}, mergedDescriptors);
}
function cloneDef(schema) {
    return mergeDefs(schema._zod.def);
}
function getElementAtPath(obj, path) {
    if (!path)
        return obj;
    return path.reduce((acc, key) => acc?.[key], obj);
}
function promiseAllObject(promisesObj) {
    const keys = Object.keys(promisesObj);
    const promises = keys.map((key) => promisesObj[key]);
    return Promise.all(promises).then((results) => {
        const resolvedObj = {};
        for (let i = 0; i < keys.length; i++) {
            resolvedObj[keys[i]] = results[i];
        }
        return resolvedObj;
    });
}
function randomString(length = 10) {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    let str = "";
    for (let i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}
function esc(str) {
    return JSON.stringify(str);
}
const captureStackTrace = ("captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => { });
function isObject(data) {
    return typeof data === "object" && data !== null && !Array.isArray(data);
}
const allowsEval = cached(() => {
    // @ts-ignore
    if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) {
        return false;
    }
    try {
        const F = Function;
        new F("");
        return true;
    }
    catch (_) {
        return false;
    }
});
function isPlainObject(o) {
    if (isObject(o) === false)
        return false;
    // modified constructor
    const ctor = o.constructor;
    if (ctor === undefined)
        return true;
    // modified prototype
    const prot = ctor.prototype;
    if (isObject(prot) === false)
        return false;
    // ctor doesn't have static `isPrototypeOf`
    if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
        return false;
    }
    return true;
}
function shallowClone(o) {
    if (isPlainObject(o))
        return { ...o };
    return o;
}
function numKeys(data) {
    let keyCount = 0;
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            keyCount++;
        }
    }
    return keyCount;
}
const getParsedType = (data) => {
    const t = typeof data;
    switch (t) {
        case "undefined":
            return "undefined";
        case "string":
            return "string";
        case "number":
            return Number.isNaN(data) ? "nan" : "number";
        case "boolean":
            return "boolean";
        case "function":
            return "function";
        case "bigint":
            return "bigint";
        case "symbol":
            return "symbol";
        case "object":
            if (Array.isArray(data)) {
                return "array";
            }
            if (data === null) {
                return "null";
            }
            if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
                return "promise";
            }
            if (typeof Map !== "undefined" && data instanceof Map) {
                return "map";
            }
            if (typeof Set !== "undefined" && data instanceof Set) {
                return "set";
            }
            if (typeof Date !== "undefined" && data instanceof Date) {
                return "date";
            }
            // @ts-ignore
            if (typeof File !== "undefined" && data instanceof File) {
                return "file";
            }
            return "object";
        default:
            throw new Error(`Unknown data type: ${t}`);
    }
};
const propertyKeyTypes = new Set(["string", "number", "symbol"]);
const primitiveTypes = new Set(["string", "number", "bigint", "boolean", "symbol", "undefined"]);
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
// zod-specific utils
function clone(inst, def, params) {
    const cl = new inst._zod.constr(def ?? inst._zod.def);
    if (!def || params?.parent)
        cl._zod.parent = inst;
    return cl;
}
function normalizeParams(_params) {
    const params = _params;
    if (!params)
        return {};
    if (typeof params === "string")
        return { error: () => params };
    if (params?.message !== undefined) {
        if (params?.error !== undefined)
            throw new Error("Cannot specify both `message` and `error` params");
        params.error = params.message;
    }
    delete params.message;
    if (typeof params.error === "string")
        return { ...params, error: () => params.error };
    return params;
}
function createTransparentProxy(getter) {
    let target;
    return new Proxy({}, {
        get(_, prop, receiver) {
            target ?? (target = getter());
            return Reflect.get(target, prop, receiver);
        },
        set(_, prop, value, receiver) {
            target ?? (target = getter());
            return Reflect.set(target, prop, value, receiver);
        },
        has(_, prop) {
            target ?? (target = getter());
            return Reflect.has(target, prop);
        },
        deleteProperty(_, prop) {
            target ?? (target = getter());
            return Reflect.deleteProperty(target, prop);
        },
        ownKeys(_) {
            target ?? (target = getter());
            return Reflect.ownKeys(target);
        },
        getOwnPropertyDescriptor(_, prop) {
            target ?? (target = getter());
            return Reflect.getOwnPropertyDescriptor(target, prop);
        },
        defineProperty(_, prop, descriptor) {
            target ?? (target = getter());
            return Reflect.defineProperty(target, prop, descriptor);
        },
    });
}
function stringifyPrimitive(value) {
    if (typeof value === "bigint")
        return value.toString() + "n";
    if (typeof value === "string")
        return `"${value}"`;
    return `${value}`;
}
function optionalKeys(shape) {
    return Object.keys(shape).filter((k) => {
        return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
    });
}
const NUMBER_FORMAT_RANGES = {
    safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
    int32: [-2147483648, 2147483647],
    uint32: [0, 4294967295],
    float32: [-3.4028234663852886e38, 3.4028234663852886e38],
    float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
};
const BIGINT_FORMAT_RANGES = {
    int64: [/* @__PURE__*/ BigInt("-9223372036854775808"), /* @__PURE__*/ BigInt("9223372036854775807")],
    uint64: [/* @__PURE__*/ BigInt(0), /* @__PURE__*/ BigInt("18446744073709551615")],
};
function pick(schema, mask) {
    const currDef = schema._zod.def;
    const def = mergeDefs(schema._zod.def, {
        get shape() {
            const newShape = {};
            for (const key in mask) {
                if (!(key in currDef.shape)) {
                    throw new Error(`Unrecognized key: "${key}"`);
                }
                if (!mask[key])
                    continue;
                newShape[key] = currDef.shape[key];
            }
            assignProp(this, "shape", newShape); // self-caching
            return newShape;
        },
        checks: [],
    });
    return clone(schema, def);
}
function omit(schema, mask) {
    const currDef = schema._zod.def;
    const def = mergeDefs(schema._zod.def, {
        get shape() {
            const newShape = { ...schema._zod.def.shape };
            for (const key in mask) {
                if (!(key in currDef.shape)) {
                    throw new Error(`Unrecognized key: "${key}"`);
                }
                if (!mask[key])
                    continue;
                delete newShape[key];
            }
            assignProp(this, "shape", newShape); // self-caching
            return newShape;
        },
        checks: [],
    });
    return clone(schema, def);
}
function extend(schema, shape) {
    if (!isPlainObject(shape)) {
        throw new Error("Invalid input to extend: expected a plain object");
    }
    const checks = schema._zod.def.checks;
    const hasChecks = checks && checks.length > 0;
    if (hasChecks) {
        throw new Error("Object schemas containing refinements cannot be extended. Use `.safeExtend()` instead.");
    }
    const def = mergeDefs(schema._zod.def, {
        get shape() {
            const _shape = { ...schema._zod.def.shape, ...shape };
            assignProp(this, "shape", _shape); // self-caching
            return _shape;
        },
        checks: [],
    });
    return clone(schema, def);
}
function safeExtend(schema, shape) {
    if (!isPlainObject(shape)) {
        throw new Error("Invalid input to safeExtend: expected a plain object");
    }
    const def = {
        ...schema._zod.def,
        get shape() {
            const _shape = { ...schema._zod.def.shape, ...shape };
            assignProp(this, "shape", _shape); // self-caching
            return _shape;
        },
        checks: schema._zod.def.checks,
    };
    return clone(schema, def);
}
function merge(a, b) {
    const def = mergeDefs(a._zod.def, {
        get shape() {
            const _shape = { ...a._zod.def.shape, ...b._zod.def.shape };
            assignProp(this, "shape", _shape); // self-caching
            return _shape;
        },
        get catchall() {
            return b._zod.def.catchall;
        },
        checks: [], // delete existing checks
    });
    return clone(a, def);
}
function partial(Class, schema, mask) {
    const def = mergeDefs(schema._zod.def, {
        get shape() {
            const oldShape = schema._zod.def.shape;
            const shape = { ...oldShape };
            if (mask) {
                for (const key in mask) {
                    if (!(key in oldShape)) {
                        throw new Error(`Unrecognized key: "${key}"`);
                    }
                    if (!mask[key])
                        continue;
                    // if (oldShape[key]!._zod.optin === "optional") continue;
                    shape[key] = Class
                        ? new Class({
                            type: "optional",
                            innerType: oldShape[key],
                        })
                        : oldShape[key];
                }
            }
            else {
                for (const key in oldShape) {
                    // if (oldShape[key]!._zod.optin === "optional") continue;
                    shape[key] = Class
                        ? new Class({
                            type: "optional",
                            innerType: oldShape[key],
                        })
                        : oldShape[key];
                }
            }
            assignProp(this, "shape", shape); // self-caching
            return shape;
        },
        checks: [],
    });
    return clone(schema, def);
}
function required(Class, schema, mask) {
    const def = mergeDefs(schema._zod.def, {
        get shape() {
            const oldShape = schema._zod.def.shape;
            const shape = { ...oldShape };
            if (mask) {
                for (const key in mask) {
                    if (!(key in shape)) {
                        throw new Error(`Unrecognized key: "${key}"`);
                    }
                    if (!mask[key])
                        continue;
                    // overwrite with non-optional
                    shape[key] = new Class({
                        type: "nonoptional",
                        innerType: oldShape[key],
                    });
                }
            }
            else {
                for (const key in oldShape) {
                    // overwrite with non-optional
                    shape[key] = new Class({
                        type: "nonoptional",
                        innerType: oldShape[key],
                    });
                }
            }
            assignProp(this, "shape", shape); // self-caching
            return shape;
        },
        checks: [],
    });
    return clone(schema, def);
}
// invalid_type | too_big | too_small | invalid_format | not_multiple_of | unrecognized_keys | invalid_union | invalid_key | invalid_element | invalid_value | custom
function aborted(x, startIndex = 0) {
    if (x.aborted === true)
        return true;
    for (let i = startIndex; i < x.issues.length; i++) {
        if (x.issues[i]?.continue !== true) {
            return true;
        }
    }
    return false;
}
function prefixIssues(path, issues) {
    return issues.map((iss) => {
        var _a;
        (_a = iss).path ?? (_a.path = []);
        iss.path.unshift(path);
        return iss;
    });
}
function unwrapMessage(message) {
    return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config) {
    const full = { ...iss, path: iss.path ?? [] };
    // for backwards compatibility
    if (!iss.message) {
        const message = unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ??
            unwrapMessage(ctx?.error?.(iss)) ??
            unwrapMessage(config.customError?.(iss)) ??
            unwrapMessage(config.localeError?.(iss)) ??
            "Invalid input";
        full.message = message;
    }
    // delete (full as any).def;
    delete full.inst;
    delete full.continue;
    if (!ctx?.reportInput) {
        delete full.input;
    }
    return full;
}
function getSizableOrigin(input) {
    if (input instanceof Set)
        return "set";
    if (input instanceof Map)
        return "map";
    // @ts-ignore
    if (input instanceof File)
        return "file";
    return "unknown";
}
function getLengthableOrigin(input) {
    if (Array.isArray(input))
        return "array";
    if (typeof input === "string")
        return "string";
    return "unknown";
}
function issue(...args) {
    const [iss, input, inst] = args;
    if (typeof iss === "string") {
        return {
            message: iss,
            code: "custom",
            input,
            inst,
        };
    }
    return { ...iss };
}
function cleanEnum(obj) {
    return Object.entries(obj)
        .filter(([k, _]) => {
        // return true if NaN, meaning it's not a number, thus a string key
        return Number.isNaN(Number.parseInt(k, 10));
    })
        .map((el) => el[1]);
}
// Codec utility functions
function base64ToUint8Array(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}
function uint8ArrayToBase64(bytes) {
    let binaryString = "";
    for (let i = 0; i < bytes.length; i++) {
        binaryString += String.fromCharCode(bytes[i]);
    }
    return btoa(binaryString);
}
function base64urlToUint8Array(base64url) {
    const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
    const padding = "=".repeat((4 - (base64.length % 4)) % 4);
    return base64ToUint8Array(base64 + padding);
}
function uint8ArrayToBase64url(bytes) {
    return uint8ArrayToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function hexToUint8Array(hex) {
    const cleanHex = hex.replace(/^0x/, "");
    if (cleanHex.length % 2 !== 0) {
        throw new Error("Invalid hex string length");
    }
    const bytes = new Uint8Array(cleanHex.length / 2);
    for (let i = 0; i < cleanHex.length; i += 2) {
        bytes[i / 2] = Number.parseInt(cleanHex.slice(i, i + 2), 16);
    }
    return bytes;
}
function uint8ArrayToHex(bytes) {
    return Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}
// instanceof
class Class {
    constructor(..._args) { }
}


/***/ }),

/***/ 4998:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

function getBelarusianPlural(count, one, few, many) {
    const absCount = Math.abs(count);
    const lastDigit = absCount % 10;
    const lastTwoDigits = absCount % 100;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return many;
    }
    if (lastDigit === 1) {
        return one;
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
        return few;
    }
    return many;
}
const error = () => {
    const Sizable = {
        string: {
            unit: {
                one: "сімвал",
                few: "сімвалы",
                many: "сімвалаў",
            },
            verb: "мець",
        },
        array: {
            unit: {
                one: "элемент",
                few: "элементы",
                many: "элементаў",
            },
            verb: "мець",
        },
        set: {
            unit: {
                one: "элемент",
                few: "элементы",
                many: "элементаў",
            },
            verb: "мець",
        },
        file: {
            unit: {
                one: "байт",
                few: "байты",
                many: "байтаў",
            },
            verb: "мець",
        },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "лік";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "масіў";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "увод",
        email: "email адрас",
        url: "URL",
        emoji: "эмодзі",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO дата і час",
        date: "ISO дата",
        time: "ISO час",
        duration: "ISO працягласць",
        ipv4: "IPv4 адрас",
        ipv6: "IPv6 адрас",
        cidrv4: "IPv4 дыяпазон",
        cidrv6: "IPv6 дыяпазон",
        base64: "радок у фармаце base64",
        base64url: "радок у фармаце base64url",
        json_string: "JSON радок",
        e164: "нумар E.164",
        jwt: "JWT",
        template_literal: "увод",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Няправільны ўвод: чакаўся ${issue.expected}, атрымана ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Няправільны ўвод: чакалася ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Няправільны варыянт: чакаўся адзін з ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    const maxValue = Number(issue.maximum);
                    const unit = getBelarusianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
                    return `Занадта вялікі: чакалася, што ${issue.origin ?? "значэнне"} павінна ${sizing.verb} ${adj}${issue.maximum.toString()} ${unit}`;
                }
                return `Занадта вялікі: чакалася, што ${issue.origin ?? "значэнне"} павінна быць ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    const minValue = Number(issue.minimum);
                    const unit = getBelarusianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
                    return `Занадта малы: чакалася, што ${issue.origin} павінна ${sizing.verb} ${adj}${issue.minimum.toString()} ${unit}`;
                }
                return `Занадта малы: чакалася, што ${issue.origin} павінна быць ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `Няправільны радок: павінен пачынацца з "${_issue.prefix}"`;
                if (_issue.format === "ends_with")
                    return `Няправільны радок: павінен заканчвацца на "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Няправільны радок: павінен змяшчаць "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Няправільны радок: павінен адпавядаць шаблону ${_issue.pattern}`;
                return `Няправільны ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Няправільны лік: павінен быць кратным ${issue.divisor}`;
            case "unrecognized_keys":
                return `Нераспазнаны ${issue.keys.length > 1 ? "ключы" : "ключ"}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Няправільны ключ у ${issue.origin}`;
            case "invalid_union":
                return "Няправільны ўвод";
            case "invalid_element":
                return `Няправільнае значэнне ў ${issue.origin}`;
            default:
                return `Няправільны ўвод`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 5014:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

function getRussianPlural(count, one, few, many) {
    const absCount = Math.abs(count);
    const lastDigit = absCount % 10;
    const lastTwoDigits = absCount % 100;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return many;
    }
    if (lastDigit === 1) {
        return one;
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
        return few;
    }
    return many;
}
const error = () => {
    const Sizable = {
        string: {
            unit: {
                one: "символ",
                few: "символа",
                many: "символов",
            },
            verb: "иметь",
        },
        file: {
            unit: {
                one: "байт",
                few: "байта",
                many: "байт",
            },
            verb: "иметь",
        },
        array: {
            unit: {
                one: "элемент",
                few: "элемента",
                many: "элементов",
            },
            verb: "иметь",
        },
        set: {
            unit: {
                one: "элемент",
                few: "элемента",
                many: "элементов",
            },
            verb: "иметь",
        },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "число";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "массив";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "ввод",
        email: "email адрес",
        url: "URL",
        emoji: "эмодзи",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO дата и время",
        date: "ISO дата",
        time: "ISO время",
        duration: "ISO длительность",
        ipv4: "IPv4 адрес",
        ipv6: "IPv6 адрес",
        cidrv4: "IPv4 диапазон",
        cidrv6: "IPv6 диапазон",
        base64: "строка в формате base64",
        base64url: "строка в формате base64url",
        json_string: "JSON строка",
        e164: "номер E.164",
        jwt: "JWT",
        template_literal: "ввод",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Неверный ввод: ожидалось ${issue.expected}, получено ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Неверный ввод: ожидалось ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Неверный вариант: ожидалось одно из ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    const maxValue = Number(issue.maximum);
                    const unit = getRussianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
                    return `Слишком большое значение: ожидалось, что ${issue.origin ?? "значение"} будет иметь ${adj}${issue.maximum.toString()} ${unit}`;
                }
                return `Слишком большое значение: ожидалось, что ${issue.origin ?? "значение"} будет ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    const minValue = Number(issue.minimum);
                    const unit = getRussianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
                    return `Слишком маленькое значение: ожидалось, что ${issue.origin} будет иметь ${adj}${issue.minimum.toString()} ${unit}`;
                }
                return `Слишком маленькое значение: ожидалось, что ${issue.origin} будет ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `Неверная строка: должна начинаться с "${_issue.prefix}"`;
                if (_issue.format === "ends_with")
                    return `Неверная строка: должна заканчиваться на "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Неверная строка: должна содержать "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Неверная строка: должна соответствовать шаблону ${_issue.pattern}`;
                return `Неверный ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Неверное число: должно быть кратным ${issue.divisor}`;
            case "unrecognized_keys":
                return `Нераспознанн${issue.keys.length > 1 ? "ые" : "ый"} ключ${issue.keys.length > 1 ? "и" : ""}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Неверный ключ в ${issue.origin}`;
            case "invalid_union":
                return "Неверные входные данные";
            case "invalid_element":
                return `Неверное значение в ${issue.origin}`;
            default:
                return `Неверные входные данные`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 5241:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "tekens" },
        file: { unit: "bytes" },
        array: { unit: "elementen" },
        set: { unit: "elementen" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "getal";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "array";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "invoer",
        email: "emailadres",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO datum en tijd",
        date: "ISO datum",
        time: "ISO tijd",
        duration: "ISO duur",
        ipv4: "IPv4-adres",
        ipv6: "IPv6-adres",
        cidrv4: "IPv4-bereik",
        cidrv6: "IPv6-bereik",
        base64: "base64-gecodeerde tekst",
        base64url: "base64 URL-gecodeerde tekst",
        json_string: "JSON string",
        e164: "E.164-nummer",
        jwt: "JWT",
        template_literal: "invoer",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Ongeldige invoer: verwacht ${issue.expected}, ontving ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Ongeldige invoer: verwacht ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Ongeldige optie: verwacht één van ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Te lang: verwacht dat ${issue.origin ?? "waarde"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementen"} bevat`;
                return `Te lang: verwacht dat ${issue.origin ?? "waarde"} ${adj}${issue.maximum.toString()} is`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Te kort: verwacht dat ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} bevat`;
                }
                return `Te kort: verwacht dat ${issue.origin} ${adj}${issue.minimum.toString()} is`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with") {
                    return `Ongeldige tekst: moet met "${_issue.prefix}" beginnen`;
                }
                if (_issue.format === "ends_with")
                    return `Ongeldige tekst: moet op "${_issue.suffix}" eindigen`;
                if (_issue.format === "includes")
                    return `Ongeldige tekst: moet "${_issue.includes}" bevatten`;
                if (_issue.format === "regex")
                    return `Ongeldige tekst: moet overeenkomen met patroon ${_issue.pattern}`;
                return `Ongeldig: ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Ongeldig getal: moet een veelvoud van ${issue.divisor} zijn`;
            case "unrecognized_keys":
                return `Onbekende key${issue.keys.length > 1 ? "s" : ""}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Ongeldige key in ${issue.origin}`;
            case "invalid_union":
                return "Ongeldige invoer";
            case "invalid_element":
                return `Ongeldige waarde in ${issue.origin}`;
            default:
                return `Ongeldige invoer`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 5257:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZodISODate: () => (/* binding */ ZodISODate),
/* harmony export */   ZodISODateTime: () => (/* binding */ ZodISODateTime),
/* harmony export */   ZodISODuration: () => (/* binding */ ZodISODuration),
/* harmony export */   ZodISOTime: () => (/* binding */ ZodISOTime),
/* harmony export */   date: () => (/* binding */ date),
/* harmony export */   datetime: () => (/* binding */ datetime),
/* harmony export */   duration: () => (/* binding */ duration),
/* harmony export */   time: () => (/* binding */ time)
/* harmony export */ });
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3259);
/* harmony import */ var _schemas_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2308);


const ZodISODateTime = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodISODateTime", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodISODateTime.init(inst, def);
    _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodStringFormat.init(inst, def);
});
function datetime(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._isoDateTime(ZodISODateTime, params);
}
const ZodISODate = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodISODate", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodISODate.init(inst, def);
    _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodStringFormat.init(inst, def);
});
function date(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._isoDate(ZodISODate, params);
}
const ZodISOTime = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodISOTime", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodISOTime.init(inst, def);
    _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodStringFormat.init(inst, def);
});
function time(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._isoTime(ZodISOTime, params);
}
const ZodISODuration = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodISODuration", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodISODuration.init(inst, def);
    _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodStringFormat.init(inst, def);
});
function duration(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__._isoDuration(ZodISODuration, params);
}


/***/ }),

/***/ 5518:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DomUtils: () => (/* binding */ DomUtils),
/* harmony export */   findRealUserKey: () => (/* binding */ findRealUserKey),
/* harmony export */   globalState: () => (/* binding */ globalState),
/* harmony export */   safeGet: () => (/* binding */ safeGet),
/* harmony export */   safeGetMvuData: () => (/* binding */ safeGetMvuData),
/* harmony export */   safeSet: () => (/* binding */ safeSet),
/* harmony export */   updateMvu: () => (/* binding */ updateMvu)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7759);

// Global state management with jQuery and Zod validation
class GlobalStateManager {
    static instance;
    state;
    constructor() {
        this.state = {
            ALARIC_CURRENT_SOP: null,
            ALARIC_CURRENT_SOP_ID: null,
            ALARIC_CURRENT_SPICE: null,
            ALARIC_SOP_ACTIVE: false,
            ALARIC_AFTERCARE_INJECTED: false,
            ALARIC_DAILY_DISABLED: true,
            ALARIC_INJECTED_PROMPTS: new Map(),
            ALARIC_CURRENT_MODE: null,
            TEMP_SPECIFIED_PLAY: null,
        };
    }
    static getInstance() {
        if (!GlobalStateManager.instance) {
            GlobalStateManager.instance = new GlobalStateManager();
        }
        return GlobalStateManager.instance;
    }
    getState() {
        return { ...this.state };
    }
    setState(updates) {
        this.state = { ...this.state, ...updates };
    }
    get(key) {
        return this.state[key];
    }
    set(key, value) {
        this.state[key] = value;
    }
}
// Export singleton instance
const globalState = GlobalStateManager.getInstance();
// Safe MVU data getter with Zod validation
async function safeGetMvuData() {
    try {
        // Check if MVU plugin is available
        if (typeof window.Mvu === 'undefined') {
            console.warn('[ALRIC] MVU plugin not loaded');
            toastr.error('MVU插件未加载！请确保MVU插件已启用');
            return null;
        }
        // Get current message ID using Tavern Helper API
        const currentMessageId = await getCurrentMessageId();
        const mvuData = await window.Mvu.getMvuData({ type: 'message', message_id: currentMessageId });
        // Validate with Zod
        const validationResult = _types__WEBPACK_IMPORTED_MODULE_0__.MvuDataSchema.safeParse(mvuData);
        if (!validationResult.success) {
            console.warn('[ALRIC] MVU data validation failed:', validationResult.error);
            // Don't return null, try to use the data anyway but log the issues
            console.warn('[ALRIC] Attempting to use invalid data structure');
        }
        return mvuData;
    }
    catch (error) {
        console.warn('[ALRIC] Failed to get MVU data:', error);
        toastr.error('读取MVU数据失败', 'ALRIC系统');
        return null;
    }
}
// Safe data getter with path navigation
function safeGet(path, def = null) {
    try {
        // Split path and navigate
        const parts = path.split('.');
        let current = window;
        for (const part of parts) {
            if (current && typeof current === 'object' && part in current) {
                current = current[part];
            }
            else {
                return def;
            }
        }
        // Return default if value is empty
        if (current === null || current === undefined || current === '') {
            return def;
        }
        // Handle arrays - return first element if it's an array
        return Array.isArray(current) && current.length > 0 ? current[0] : current;
    }
    catch (error) {
        console.warn('[ALRIC] safeGet error:', error);
        return def;
    }
}
// Safe data setter
function safeSet(path, value) {
    try {
        const parts = path.split('.');
        let current = window;
        // Navigate to parent object
        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i];
            if (!current[part] || typeof current[part] !== 'object') {
                current[part] = {};
            }
            current = current[part];
        }
        // Set the value
        current[parts[parts.length - 1]] = value;
        return true;
    }
    catch (error) {
        console.warn('[ALRIC] safeSet error:', error);
        return false;
    }
}
// Find real user key from MVU data
function findRealUserKey(mvuData) {
    if (!mvuData?.stat_data?.角色档案)
        return '{{user}}';
    const chars = mvuData.stat_data.角色档案;
    const keys = Object.keys(chars);
    const mainChar = '容晏';
    // 1. Find character with "玩家偏好" (player preferences)
    const historyMatch = keys.find(k => k !== mainChar && chars[k]?.玩家偏好);
    if (historyMatch)
        return historyMatch;
    // 2. Check for {{user}} placeholder
    if (chars['{{user}}'])
        return '{{user}}';
    // 3. Fallback: find any character that's not main character
    const stranger = keys.find(k => k !== mainChar);
    return stranger || '{{user}}';
}
// Update MVU data safely
async function updateMvu(updateFn) {
    try {
        const currentMessageId = await getCurrentMessageId();
        let mvuData = await safeGetMvuData();
        if (!mvuData) {
            mvuData = { stat_data: { 世界记录: {}, 角色档案: {} } };
        }
        if (!mvuData.stat_data)
            mvuData.stat_data = {};
        if (!mvuData.stat_data.角色档案)
            mvuData.stat_data.角色档案 = {};
        if (!mvuData.stat_data.世界记录)
            mvuData.stat_data.世界记录 = {};
        const userKey = findRealUserKey(mvuData);
        const user = mvuData.stat_data.角色档案[userKey];
        // Ensure user object exists with required structure
        if (!user) {
            mvuData.stat_data.角色档案[userKey] = {};
        }
        if (!mvuData.stat_data.角色档案[userKey].玩家偏好) {
            mvuData.stat_data.角色档案[userKey].玩家偏好 = {};
        }
        if (!mvuData.stat_data.角色档案[userKey].玩家偏好.XP雷达) {
            mvuData.stat_data.角色档案[userKey].玩家偏好.XP雷达 = {};
        }
        if (!mvuData.stat_data.角色档案[userKey].玩家偏好.互动边界) {
            mvuData.stat_data.角色档案[userKey].玩家偏好.互动边界 = {};
        }
        if (!mvuData.stat_data.角色档案[userKey].玩家偏好.互动边界.安全词) {
            mvuData.stat_data.角色档案[userKey].玩家偏好.互动边界.安全词 = {};
        }
        if (!mvuData.stat_data.角色档案[userKey].造物逻辑) {
            mvuData.stat_data.角色档案[userKey].造物逻辑 = {};
        }
        if (!mvuData.stat_data.角色档案[userKey].造物逻辑.定制课程) {
            mvuData.stat_data.角色档案[userKey].造物逻辑.定制课程 = {};
        }
        // Execute update function with proper parameters
        const fnStr = updateFn.toString();
        const paramMatch = fnStr.match(/^\s*\(\s*([^)]+)\s*\)\s*=>/);
        if (paramMatch) {
            const params = paramMatch[1].split(',').map(p => p.trim());
            if (params.length === 1) {
                updateFn(mvuData.stat_data);
            }
            else if (params.length === 2) {
                updateFn(mvuData.stat_data, userKey);
            }
            else if (params.length >= 3) {
                updateFn(mvuData.stat_data, userKey, user);
            }
        }
        else {
            updateFn(mvuData.stat_data, userKey, user);
        }
        // Save data using MVU API
        let saveResult;
        if (typeof window.Mvu.replaceMvuData === 'function') {
            saveResult = await window.Mvu.replaceMvuData(mvuData, { type: 'message', message_id: currentMessageId });
        }
        else if (typeof window.Mvu.replaceCurrentMvuData === 'function') {
            saveResult = await window.Mvu.replaceCurrentMvuData(mvuData);
        }
        else {
            throw new Error('No save function available');
        }
        toastr.success('✅ 数据已更新');
        return true;
    }
    catch (error) {
        console.error('[ALRIC] Update MVU data failed:', error);
        toastr.error('❌ 保存失败: ' + error.message);
        return false;
    }
}
// Get current message ID using Tavern Helper API
async function getCurrentMessageId() {
    try {
        // Try to get chat messages using Tavern Helper API
        if (typeof getChatMessages === 'function') {
            const messages = await getChatMessages();
            return messages && messages.length > 0 ? messages.length - 1 : 0;
        }
        // Fallback to window object
        if (typeof window !== 'undefined' && window.SillyTavern?.chat) {
            return window.SillyTavern.chat.length > 0 ? window.SillyTavern.chat.length - 1 : 0;
        }
        return 0;
    }
    catch (error) {
        console.warn('[ALRIC] Failed to get current message ID:', error);
        return 0;
    }
}
// jQuery-based DOM utilities
class DomUtils {
    static showButtons(buttons) {
        if (typeof replaceScriptButtons === 'function') {
            replaceScriptButtons(buttons);
        }
    }
    static showNotification(message, type = 'info') {
        if (typeof toastr === 'object' && toastr[type]) {
            toastr[type](message);
        }
        else {
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    }
    static async showPopup(message, type = 'text', defaultValue = '') {
        if (typeof SillyTavern?.callGenericPopup === 'function' && typeof SillyTavern.POPUP_TYPE === 'object') {
            try {
                const popupType = type === 'input' ? SillyTavern.POPUP_TYPE.INPUT : SillyTavern.POPUP_TYPE.TEXT;
                return await SillyTavern.callGenericPopup(message, popupType, defaultValue);
            }
            catch (error) {
                console.warn('[ALRIC] Popup failed:', error);
                return undefined;
            }
        }
        return undefined;
    }
}


/***/ }),

/***/ 5615:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "знаци", verb: "да имаат" },
        file: { unit: "бајти", verb: "да имаат" },
        array: { unit: "ставки", verb: "да имаат" },
        set: { unit: "ставки", verb: "да имаат" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "број";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "низа";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "внес",
        email: "адреса на е-пошта",
        url: "URL",
        emoji: "емоџи",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO датум и време",
        date: "ISO датум",
        time: "ISO време",
        duration: "ISO времетраење",
        ipv4: "IPv4 адреса",
        ipv6: "IPv6 адреса",
        cidrv4: "IPv4 опсег",
        cidrv6: "IPv6 опсег",
        base64: "base64-енкодирана низа",
        base64url: "base64url-енкодирана низа",
        json_string: "JSON низа",
        e164: "E.164 број",
        jwt: "JWT",
        template_literal: "внес",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Грешен внес: се очекува ${issue.expected}, примено ${parsedType(issue.input)}`;
            // return `Invalid input: expected ${issue.expected}, received ${util.getParsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Invalid input: expected ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Грешана опција: се очекува една ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Премногу голем: се очекува ${issue.origin ?? "вредноста"} да има ${adj}${issue.maximum.toString()} ${sizing.unit ?? "елементи"}`;
                return `Премногу голем: се очекува ${issue.origin ?? "вредноста"} да биде ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Премногу мал: се очекува ${issue.origin} да има ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `Премногу мал: се очекува ${issue.origin} да биде ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with") {
                    return `Неважечка низа: мора да започнува со "${_issue.prefix}"`;
                }
                if (_issue.format === "ends_with")
                    return `Неважечка низа: мора да завршува со "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Неважечка низа: мора да вклучува "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Неважечка низа: мора да одгоара на патернот ${_issue.pattern}`;
                return `Invalid ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Грешен број: мора да биде делив со ${issue.divisor}`;
            case "unrecognized_keys":
                return `${issue.keys.length > 1 ? "Непрепознаени клучеви" : "Непрепознаен клуч"}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Грешен клуч во ${issue.origin}`;
            case "invalid_union":
                return "Грешен внес";
            case "invalid_element":
                return `Грешна вредност во ${issue.origin}`;
            default:
                return `Грешен внес`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 5783:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "caracteres", verb: "ter" },
        file: { unit: "bytes", verb: "ter" },
        array: { unit: "itens", verb: "ter" },
        set: { unit: "itens", verb: "ter" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "número";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "array";
                }
                if (data === null) {
                    return "nulo";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "padrão",
        email: "endereço de e-mail",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "data e hora ISO",
        date: "data ISO",
        time: "hora ISO",
        duration: "duração ISO",
        ipv4: "endereço IPv4",
        ipv6: "endereço IPv6",
        cidrv4: "faixa de IPv4",
        cidrv6: "faixa de IPv6",
        base64: "texto codificado em base64",
        base64url: "URL codificada em base64",
        json_string: "texto JSON",
        e164: "número E.164",
        jwt: "JWT",
        template_literal: "entrada",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Tipo inválido: esperado ${issue.expected}, recebido ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Entrada inválida: esperado ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Opção inválida: esperada uma das ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Muito grande: esperado que ${issue.origin ?? "valor"} tivesse ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementos"}`;
                return `Muito grande: esperado que ${issue.origin ?? "valor"} fosse ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Muito pequeno: esperado que ${issue.origin} tivesse ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `Muito pequeno: esperado que ${issue.origin} fosse ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `Texto inválido: deve começar com "${_issue.prefix}"`;
                if (_issue.format === "ends_with")
                    return `Texto inválido: deve terminar com "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Texto inválido: deve incluir "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Texto inválido: deve corresponder ao padrão ${_issue.pattern}`;
                return `${Nouns[_issue.format] ?? issue.format} inválido`;
            }
            case "not_multiple_of":
                return `Número inválido: deve ser múltiplo de ${issue.divisor}`;
            case "unrecognized_keys":
                return `Chave${issue.keys.length > 1 ? "s" : ""} desconhecida${issue.keys.length > 1 ? "s" : ""}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Chave inválida em ${issue.origin}`;
            case "invalid_union":
                return "Entrada inválida";
            case "invalid_element":
                return `Valor inválido em ${issue.origin}`;
            default:
                return `Campo inválido`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 5936:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $brand: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.$brand),
/* harmony export */   $input: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.$input),
/* harmony export */   $output: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.$output),
/* harmony export */   NEVER: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.NEVER),
/* harmony export */   TimePrecision: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.TimePrecision),
/* harmony export */   ZodAny: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodAny),
/* harmony export */   ZodArray: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodArray),
/* harmony export */   ZodBase64: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodBase64),
/* harmony export */   ZodBase64URL: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodBase64URL),
/* harmony export */   ZodBigInt: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodBigInt),
/* harmony export */   ZodBigIntFormat: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodBigIntFormat),
/* harmony export */   ZodBoolean: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodBoolean),
/* harmony export */   ZodCIDRv4: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodCIDRv4),
/* harmony export */   ZodCIDRv6: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodCIDRv6),
/* harmony export */   ZodCUID: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodCUID),
/* harmony export */   ZodCUID2: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodCUID2),
/* harmony export */   ZodCatch: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodCatch),
/* harmony export */   ZodCodec: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodCodec),
/* harmony export */   ZodCustom: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodCustom),
/* harmony export */   ZodCustomStringFormat: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodCustomStringFormat),
/* harmony export */   ZodDate: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodDate),
/* harmony export */   ZodDefault: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodDefault),
/* harmony export */   ZodDiscriminatedUnion: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodDiscriminatedUnion),
/* harmony export */   ZodE164: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodE164),
/* harmony export */   ZodEmail: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodEmail),
/* harmony export */   ZodEmoji: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodEmoji),
/* harmony export */   ZodEnum: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodEnum),
/* harmony export */   ZodError: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodError),
/* harmony export */   ZodFile: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodFile),
/* harmony export */   ZodFirstPartyTypeKind: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodFirstPartyTypeKind),
/* harmony export */   ZodFunction: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodFunction),
/* harmony export */   ZodGUID: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodGUID),
/* harmony export */   ZodIPv4: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodIPv4),
/* harmony export */   ZodIPv6: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodIPv6),
/* harmony export */   ZodISODate: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodISODate),
/* harmony export */   ZodISODateTime: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodISODateTime),
/* harmony export */   ZodISODuration: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodISODuration),
/* harmony export */   ZodISOTime: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodISOTime),
/* harmony export */   ZodIntersection: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodIntersection),
/* harmony export */   ZodIssueCode: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode),
/* harmony export */   ZodJWT: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodJWT),
/* harmony export */   ZodKSUID: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodKSUID),
/* harmony export */   ZodLazy: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodLazy),
/* harmony export */   ZodLiteral: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodLiteral),
/* harmony export */   ZodMap: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodMap),
/* harmony export */   ZodNaN: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodNaN),
/* harmony export */   ZodNanoID: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodNanoID),
/* harmony export */   ZodNever: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodNever),
/* harmony export */   ZodNonOptional: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodNonOptional),
/* harmony export */   ZodNull: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodNull),
/* harmony export */   ZodNullable: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodNullable),
/* harmony export */   ZodNumber: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodNumber),
/* harmony export */   ZodNumberFormat: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodNumberFormat),
/* harmony export */   ZodObject: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodObject),
/* harmony export */   ZodOptional: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodOptional),
/* harmony export */   ZodPipe: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodPipe),
/* harmony export */   ZodPrefault: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodPrefault),
/* harmony export */   ZodPromise: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodPromise),
/* harmony export */   ZodReadonly: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodReadonly),
/* harmony export */   ZodRealError: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodRealError),
/* harmony export */   ZodRecord: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodRecord),
/* harmony export */   ZodSet: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodSet),
/* harmony export */   ZodString: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodString),
/* harmony export */   ZodStringFormat: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodStringFormat),
/* harmony export */   ZodSuccess: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodSuccess),
/* harmony export */   ZodSymbol: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodSymbol),
/* harmony export */   ZodTemplateLiteral: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodTemplateLiteral),
/* harmony export */   ZodTransform: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodTransform),
/* harmony export */   ZodTuple: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodTuple),
/* harmony export */   ZodType: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodType),
/* harmony export */   ZodULID: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodULID),
/* harmony export */   ZodURL: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodURL),
/* harmony export */   ZodUUID: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodUUID),
/* harmony export */   ZodUndefined: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodUndefined),
/* harmony export */   ZodUnion: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodUnion),
/* harmony export */   ZodUnknown: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodUnknown),
/* harmony export */   ZodVoid: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodVoid),
/* harmony export */   ZodXID: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ZodXID),
/* harmony export */   _ZodString: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__._ZodString),
/* harmony export */   _default: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__._default),
/* harmony export */   _function: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__._function),
/* harmony export */   any: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.any),
/* harmony export */   array: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.array),
/* harmony export */   base64: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.base64),
/* harmony export */   base64url: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.base64url),
/* harmony export */   bigint: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.bigint),
/* harmony export */   boolean: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.boolean),
/* harmony export */   "catch": () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__["catch"]),
/* harmony export */   check: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.check),
/* harmony export */   cidrv4: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.cidrv4),
/* harmony export */   cidrv6: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.cidrv6),
/* harmony export */   clone: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.clone),
/* harmony export */   codec: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.codec),
/* harmony export */   coerce: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.coerce),
/* harmony export */   config: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.config),
/* harmony export */   core: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.core),
/* harmony export */   cuid: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.cuid),
/* harmony export */   cuid2: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.cuid2),
/* harmony export */   custom: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.custom),
/* harmony export */   date: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.date),
/* harmony export */   decode: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.decode),
/* harmony export */   decodeAsync: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.decodeAsync),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   discriminatedUnion: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.discriminatedUnion),
/* harmony export */   e164: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.e164),
/* harmony export */   email: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.email),
/* harmony export */   emoji: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.emoji),
/* harmony export */   encode: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.encode),
/* harmony export */   encodeAsync: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.encodeAsync),
/* harmony export */   endsWith: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.endsWith),
/* harmony export */   "enum": () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__["enum"]),
/* harmony export */   file: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.file),
/* harmony export */   flattenError: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.flattenError),
/* harmony export */   float32: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.float32),
/* harmony export */   float64: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.float64),
/* harmony export */   formatError: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.formatError),
/* harmony export */   "function": () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__["function"]),
/* harmony export */   getErrorMap: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.getErrorMap),
/* harmony export */   globalRegistry: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.globalRegistry),
/* harmony export */   gt: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.gt),
/* harmony export */   gte: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.gte),
/* harmony export */   guid: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.guid),
/* harmony export */   hash: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.hash),
/* harmony export */   hex: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.hex),
/* harmony export */   hostname: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.hostname),
/* harmony export */   httpUrl: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.httpUrl),
/* harmony export */   includes: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.includes),
/* harmony export */   "instanceof": () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__["instanceof"]),
/* harmony export */   int: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.int),
/* harmony export */   int32: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.int32),
/* harmony export */   int64: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.int64),
/* harmony export */   intersection: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.intersection),
/* harmony export */   ipv4: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ipv4),
/* harmony export */   ipv6: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ipv6),
/* harmony export */   iso: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.iso),
/* harmony export */   json: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.json),
/* harmony export */   jwt: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.jwt),
/* harmony export */   keyof: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.keyof),
/* harmony export */   ksuid: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ksuid),
/* harmony export */   lazy: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.lazy),
/* harmony export */   length: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.length),
/* harmony export */   literal: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.literal),
/* harmony export */   locales: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.locales),
/* harmony export */   looseObject: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.looseObject),
/* harmony export */   lowercase: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.lowercase),
/* harmony export */   lt: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.lt),
/* harmony export */   lte: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.lte),
/* harmony export */   map: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.map),
/* harmony export */   maxLength: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.maxLength),
/* harmony export */   maxSize: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.maxSize),
/* harmony export */   mime: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.mime),
/* harmony export */   minLength: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.minLength),
/* harmony export */   minSize: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.minSize),
/* harmony export */   multipleOf: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.multipleOf),
/* harmony export */   nan: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.nan),
/* harmony export */   nanoid: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.nanoid),
/* harmony export */   nativeEnum: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.nativeEnum),
/* harmony export */   negative: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.negative),
/* harmony export */   never: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.never),
/* harmony export */   nonnegative: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.nonnegative),
/* harmony export */   nonoptional: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.nonoptional),
/* harmony export */   nonpositive: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.nonpositive),
/* harmony export */   normalize: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.normalize),
/* harmony export */   "null": () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__["null"]),
/* harmony export */   nullable: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.nullable),
/* harmony export */   nullish: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.nullish),
/* harmony export */   number: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.number),
/* harmony export */   object: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.object),
/* harmony export */   optional: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.optional),
/* harmony export */   overwrite: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.overwrite),
/* harmony export */   parse: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.parse),
/* harmony export */   parseAsync: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.parseAsync),
/* harmony export */   partialRecord: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.partialRecord),
/* harmony export */   pipe: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.pipe),
/* harmony export */   positive: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.positive),
/* harmony export */   prefault: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.prefault),
/* harmony export */   preprocess: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.preprocess),
/* harmony export */   prettifyError: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.prettifyError),
/* harmony export */   promise: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.promise),
/* harmony export */   property: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.property),
/* harmony export */   readonly: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.readonly),
/* harmony export */   record: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.record),
/* harmony export */   refine: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.refine),
/* harmony export */   regex: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.regex),
/* harmony export */   regexes: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.regexes),
/* harmony export */   registry: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.registry),
/* harmony export */   safeDecode: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.safeDecode),
/* harmony export */   safeDecodeAsync: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.safeDecodeAsync),
/* harmony export */   safeEncode: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.safeEncode),
/* harmony export */   safeEncodeAsync: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.safeEncodeAsync),
/* harmony export */   safeParse: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.safeParse),
/* harmony export */   safeParseAsync: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.safeParseAsync),
/* harmony export */   set: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.set),
/* harmony export */   setErrorMap: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.setErrorMap),
/* harmony export */   size: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.size),
/* harmony export */   startsWith: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.startsWith),
/* harmony export */   strictObject: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.strictObject),
/* harmony export */   string: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.string),
/* harmony export */   stringFormat: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.stringFormat),
/* harmony export */   stringbool: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.stringbool),
/* harmony export */   success: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.success),
/* harmony export */   superRefine: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.superRefine),
/* harmony export */   symbol: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.symbol),
/* harmony export */   templateLiteral: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.templateLiteral),
/* harmony export */   toJSONSchema: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.toJSONSchema),
/* harmony export */   toLowerCase: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.toLowerCase),
/* harmony export */   toUpperCase: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.toUpperCase),
/* harmony export */   transform: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.transform),
/* harmony export */   treeifyError: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.treeifyError),
/* harmony export */   trim: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.trim),
/* harmony export */   tuple: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.tuple),
/* harmony export */   uint32: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.uint32),
/* harmony export */   uint64: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.uint64),
/* harmony export */   ulid: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.ulid),
/* harmony export */   undefined: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.undefined),
/* harmony export */   union: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.union),
/* harmony export */   unknown: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.unknown),
/* harmony export */   uppercase: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.uppercase),
/* harmony export */   url: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.url),
/* harmony export */   util: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.util),
/* harmony export */   uuid: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.uuid),
/* harmony export */   uuidv4: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.uuidv4),
/* harmony export */   uuidv6: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.uuidv6),
/* harmony export */   uuidv7: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.uuidv7),
/* harmony export */   "void": () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__["void"]),
/* harmony export */   xid: () => (/* reexport safe */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__.xid),
/* harmony export */   z: () => (/* reexport module object */ _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8261);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_v4_classic_external_js__WEBPACK_IMPORTED_MODULE_0__);


/***/ }),

/***/ 6055:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "àmi", verb: "ní" },
        file: { unit: "bytes", verb: "ní" },
        array: { unit: "nkan", verb: "ní" },
        set: { unit: "nkan", verb: "ní" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "nọ́mbà";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "akopọ";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "ẹ̀rọ ìbáwọlé",
        email: "àdírẹ́sì ìmẹ́lì",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "àkókò ISO",
        date: "ọjọ́ ISO",
        time: "àkókò ISO",
        duration: "àkókò tó pé ISO",
        ipv4: "àdírẹ́sì IPv4",
        ipv6: "àdírẹ́sì IPv6",
        cidrv4: "àgbègbè IPv4",
        cidrv6: "àgbègbè IPv6",
        base64: "ọ̀rọ̀ tí a kọ́ ní base64",
        base64url: "ọ̀rọ̀ base64url",
        json_string: "ọ̀rọ̀ JSON",
        e164: "nọ́mbà E.164",
        jwt: "JWT",
        template_literal: "ẹ̀rọ ìbáwọlé",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Ìbáwọlé aṣìṣe: a ní láti fi ${issue.expected}, àmọ̀ a rí ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Ìbáwọlé aṣìṣe: a ní láti fi ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Àṣàyàn aṣìṣe: yan ọ̀kan lára ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Tó pọ̀ jù: a ní láti jẹ́ pé ${issue.origin ?? "iye"} ${sizing.verb} ${adj}${issue.maximum} ${sizing.unit}`;
                return `Tó pọ̀ jù: a ní láti jẹ́ ${adj}${issue.maximum}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Kéré ju: a ní láti jẹ́ pé ${issue.origin} ${sizing.verb} ${adj}${issue.minimum} ${sizing.unit}`;
                return `Kéré ju: a ní láti jẹ́ ${adj}${issue.minimum}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bẹ̀rẹ̀ pẹ̀lú "${_issue.prefix}"`;
                if (_issue.format === "ends_with")
                    return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ parí pẹ̀lú "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ ní "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bá àpẹẹrẹ mu ${_issue.pattern}`;
                return `Aṣìṣe: ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Nọ́mbà aṣìṣe: gbọ́dọ̀ jẹ́ èyà pípín ti ${issue.divisor}`;
            case "unrecognized_keys":
                return `Bọtìnì àìmọ̀: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Bọtìnì aṣìṣe nínú ${issue.origin}`;
            case "invalid_union":
                return "Ìbáwọlé aṣìṣe";
            case "invalid_element":
                return `Iye aṣìṣe nínú ${issue.origin}`;
            default:
                return "Ìbáwọlé aṣìṣe";
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 6081:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZodError: () => (/* binding */ ZodError),
/* harmony export */   ZodRealError: () => (/* binding */ ZodRealError)
/* harmony export */ });
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3259);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4995);



const initializer = (inst, issues) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodError.init(inst, issues);
    inst.name = "ZodError";
    Object.defineProperties(inst, {
        format: {
            value: (mapper) => _core_index_js__WEBPACK_IMPORTED_MODULE_0__.formatError(inst, mapper),
            // enumerable: false,
        },
        flatten: {
            value: (mapper) => _core_index_js__WEBPACK_IMPORTED_MODULE_0__.flattenError(inst, mapper),
            // enumerable: false,
        },
        addIssue: {
            value: (issue) => {
                inst.issues.push(issue);
                inst.message = JSON.stringify(inst.issues, _core_util_js__WEBPACK_IMPORTED_MODULE_1__.jsonStringifyReplacer, 2);
            },
            // enumerable: false,
        },
        addIssues: {
            value: (issues) => {
                inst.issues.push(...issues);
                inst.message = JSON.stringify(inst.issues, _core_util_js__WEBPACK_IMPORTED_MODULE_1__.jsonStringifyReplacer, 2);
            },
            // enumerable: false,
        },
        isEmpty: {
            get() {
                return inst.issues.length === 0;
            },
            // enumerable: false,
        },
    });
    // Object.defineProperty(inst, "isEmpty", {
    //   get() {
    //     return inst.issues.length === 0;
    //   },
    // });
};
const ZodError = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodError", initializer);
const ZodRealError = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodError", initializer, {
    Parent: Error,
});
// /** @deprecated Use `z.core.$ZodErrorMapCtx` instead. */
// export type ErrorMapCtx = core.$ZodErrorMapCtx;


/***/ }),

/***/ 6216:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "حروف", verb: "ہونا" },
        file: { unit: "بائٹس", verb: "ہونا" },
        array: { unit: "آئٹمز", verb: "ہونا" },
        set: { unit: "آئٹمز", verb: "ہونا" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "نمبر";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "آرے";
                }
                if (data === null) {
                    return "نل";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "ان پٹ",
        email: "ای میل ایڈریس",
        url: "یو آر ایل",
        emoji: "ایموجی",
        uuid: "یو یو آئی ڈی",
        uuidv4: "یو یو آئی ڈی وی 4",
        uuidv6: "یو یو آئی ڈی وی 6",
        nanoid: "نینو آئی ڈی",
        guid: "جی یو آئی ڈی",
        cuid: "سی یو آئی ڈی",
        cuid2: "سی یو آئی ڈی 2",
        ulid: "یو ایل آئی ڈی",
        xid: "ایکس آئی ڈی",
        ksuid: "کے ایس یو آئی ڈی",
        datetime: "آئی ایس او ڈیٹ ٹائم",
        date: "آئی ایس او تاریخ",
        time: "آئی ایس او وقت",
        duration: "آئی ایس او مدت",
        ipv4: "آئی پی وی 4 ایڈریس",
        ipv6: "آئی پی وی 6 ایڈریس",
        cidrv4: "آئی پی وی 4 رینج",
        cidrv6: "آئی پی وی 6 رینج",
        base64: "بیس 64 ان کوڈڈ سٹرنگ",
        base64url: "بیس 64 یو آر ایل ان کوڈڈ سٹرنگ",
        json_string: "جے ایس او این سٹرنگ",
        e164: "ای 164 نمبر",
        jwt: "جے ڈبلیو ٹی",
        template_literal: "ان پٹ",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `غلط ان پٹ: ${issue.expected} متوقع تھا، ${parsedType(issue.input)} موصول ہوا`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `غلط ان پٹ: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])} متوقع تھا`;
                return `غلط آپشن: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")} میں سے ایک متوقع تھا`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `بہت بڑا: ${issue.origin ?? "ویلیو"} کے ${adj}${issue.maximum.toString()} ${sizing.unit ?? "عناصر"} ہونے متوقع تھے`;
                return `بہت بڑا: ${issue.origin ?? "ویلیو"} کا ${adj}${issue.maximum.toString()} ہونا متوقع تھا`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `بہت چھوٹا: ${issue.origin} کے ${adj}${issue.minimum.toString()} ${sizing.unit} ہونے متوقع تھے`;
                }
                return `بہت چھوٹا: ${issue.origin} کا ${adj}${issue.minimum.toString()} ہونا متوقع تھا`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with") {
                    return `غلط سٹرنگ: "${_issue.prefix}" سے شروع ہونا چاہیے`;
                }
                if (_issue.format === "ends_with")
                    return `غلط سٹرنگ: "${_issue.suffix}" پر ختم ہونا چاہیے`;
                if (_issue.format === "includes")
                    return `غلط سٹرنگ: "${_issue.includes}" شامل ہونا چاہیے`;
                if (_issue.format === "regex")
                    return `غلط سٹرنگ: پیٹرن ${_issue.pattern} سے میچ ہونا چاہیے`;
                return `غلط ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `غلط نمبر: ${issue.divisor} کا مضاعف ہونا چاہیے`;
            case "unrecognized_keys":
                return `غیر تسلیم شدہ کی${issue.keys.length > 1 ? "ز" : ""}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, "، ")}`;
            case "invalid_key":
                return `${issue.origin} میں غلط کی`;
            case "invalid_union":
                return "غلط ان پٹ";
            case "invalid_element":
                return `${issue.origin} میں غلط ویلیو`;
            default:
                return `غلط ان پٹ`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 6350:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "merkkiä", subject: "merkkijonon" },
        file: { unit: "tavua", subject: "tiedoston" },
        array: { unit: "alkiota", subject: "listan" },
        set: { unit: "alkiota", subject: "joukon" },
        number: { unit: "", subject: "luvun" },
        bigint: { unit: "", subject: "suuren kokonaisluvun" },
        int: { unit: "", subject: "kokonaisluvun" },
        date: { unit: "", subject: "päivämäärän" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "number";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "array";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "säännöllinen lauseke",
        email: "sähköpostiosoite",
        url: "URL-osoite",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO-aikaleima",
        date: "ISO-päivämäärä",
        time: "ISO-aika",
        duration: "ISO-kesto",
        ipv4: "IPv4-osoite",
        ipv6: "IPv6-osoite",
        cidrv4: "IPv4-alue",
        cidrv6: "IPv6-alue",
        base64: "base64-koodattu merkkijono",
        base64url: "base64url-koodattu merkkijono",
        json_string: "JSON-merkkijono",
        e164: "E.164-luku",
        jwt: "JWT",
        template_literal: "templaattimerkkijono",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Virheellinen tyyppi: odotettiin ${issue.expected}, oli ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Virheellinen syöte: täytyy olla ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Virheellinen valinta: täytyy olla yksi seuraavista: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Liian suuri: ${sizing.subject} täytyy olla ${adj}${issue.maximum.toString()} ${sizing.unit}`.trim();
                }
                return `Liian suuri: arvon täytyy olla ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Liian pieni: ${sizing.subject} täytyy olla ${adj}${issue.minimum.toString()} ${sizing.unit}`.trim();
                }
                return `Liian pieni: arvon täytyy olla ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `Virheellinen syöte: täytyy alkaa "${_issue.prefix}"`;
                if (_issue.format === "ends_with")
                    return `Virheellinen syöte: täytyy loppua "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Virheellinen syöte: täytyy sisältää "${_issue.includes}"`;
                if (_issue.format === "regex") {
                    return `Virheellinen syöte: täytyy vastata säännöllistä lauseketta ${_issue.pattern}`;
                }
                return `Virheellinen ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Virheellinen luku: täytyy olla luvun ${issue.divisor} monikerta`;
            case "unrecognized_keys":
                return `${issue.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return "Virheellinen avain tietueessa";
            case "invalid_union":
                return "Virheellinen unioni";
            case "invalid_element":
                return "Virheellinen arvo joukossa";
            default:
                return `Virheellinen syöte`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 6404:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "តួអក្សរ", verb: "គួរមាន" },
        file: { unit: "បៃ", verb: "គួរមាន" },
        array: { unit: "ធាតុ", verb: "គួរមាន" },
        set: { unit: "ធាតុ", verb: "គួរមាន" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "មិនមែនជាលេខ (NaN)" : "លេខ";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "អារេ (Array)";
                }
                if (data === null) {
                    return "គ្មានតម្លៃ (null)";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "ទិន្នន័យបញ្ចូល",
        email: "អាសយដ្ឋានអ៊ីមែល",
        url: "URL",
        emoji: "សញ្ញាអារម្មណ៍",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "កាលបរិច្ឆេទ និងម៉ោង ISO",
        date: "កាលបរិច្ឆេទ ISO",
        time: "ម៉ោង ISO",
        duration: "រយៈពេល ISO",
        ipv4: "អាសយដ្ឋាន IPv4",
        ipv6: "អាសយដ្ឋាន IPv6",
        cidrv4: "ដែនអាសយដ្ឋាន IPv4",
        cidrv6: "ដែនអាសយដ្ឋាន IPv6",
        base64: "ខ្សែអក្សរអ៊ិកូដ base64",
        base64url: "ខ្សែអក្សរអ៊ិកូដ base64url",
        json_string: "ខ្សែអក្សរ JSON",
        e164: "លេខ E.164",
        jwt: "JWT",
        template_literal: "ទិន្នន័យបញ្ចូល",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${issue.expected} ប៉ុន្តែទទួលបាន ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `ជម្រើសមិនត្រឹមត្រូវ៖ ត្រូវជាមួយក្នុងចំណោម ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `ធំពេក៖ ត្រូវការ ${issue.origin ?? "តម្លៃ"} ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "ធាតុ"}`;
                return `ធំពេក៖ ត្រូវការ ${issue.origin ?? "តម្លៃ"} ${adj} ${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `តូចពេក៖ ត្រូវការ ${issue.origin} ${adj} ${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `តូចពេក៖ ត្រូវការ ${issue.origin} ${adj} ${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with") {
                    return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវចាប់ផ្តើមដោយ "${_issue.prefix}"`;
                }
                if (_issue.format === "ends_with")
                    return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវបញ្ចប់ដោយ "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវមាន "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវតែផ្គូផ្គងនឹងទម្រង់ដែលបានកំណត់ ${_issue.pattern}`;
                return `មិនត្រឹមត្រូវ៖ ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `លេខមិនត្រឹមត្រូវ៖ ត្រូវតែជាពហុគុណនៃ ${issue.divisor}`;
            case "unrecognized_keys":
                return `រកឃើញសោមិនស្គាល់៖ ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `សោមិនត្រឹមត្រូវនៅក្នុង ${issue.origin}`;
            case "invalid_union":
                return `ទិន្នន័យមិនត្រឹមត្រូវ`;
            case "invalid_element":
                return `ទិន្នន័យមិនត្រឹមត្រូវនៅក្នុង ${issue.origin}`;
            default:
                return `ទិន្នន័យមិនត្រឹមត្រូវ`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 7122:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "caratteri", verb: "avere" },
        file: { unit: "byte", verb: "avere" },
        array: { unit: "elementi", verb: "avere" },
        set: { unit: "elementi", verb: "avere" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "numero";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "vettore";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "input",
        email: "indirizzo email",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "data e ora ISO",
        date: "data ISO",
        time: "ora ISO",
        duration: "durata ISO",
        ipv4: "indirizzo IPv4",
        ipv6: "indirizzo IPv6",
        cidrv4: "intervallo IPv4",
        cidrv6: "intervallo IPv6",
        base64: "stringa codificata in base64",
        base64url: "URL codificata in base64",
        json_string: "stringa JSON",
        e164: "numero E.164",
        jwt: "JWT",
        template_literal: "input",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Input non valido: atteso ${issue.expected}, ricevuto ${parsedType(issue.input)}`;
            // return `Input non valido: atteso ${issue.expected}, ricevuto ${util.getParsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Input non valido: atteso ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Opzione non valida: atteso uno tra ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Troppo grande: ${issue.origin ?? "valore"} deve avere ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementi"}`;
                return `Troppo grande: ${issue.origin ?? "valore"} deve essere ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Troppo piccolo: ${issue.origin} deve avere ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `Troppo piccolo: ${issue.origin} deve essere ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `Stringa non valida: deve iniziare con "${_issue.prefix}"`;
                if (_issue.format === "ends_with")
                    return `Stringa non valida: deve terminare con "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Stringa non valida: deve includere "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Stringa non valida: deve corrispondere al pattern ${_issue.pattern}`;
                return `Invalid ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Numero non valido: deve essere un multiplo di ${issue.divisor}`;
            case "unrecognized_keys":
                return `Chiav${issue.keys.length > 1 ? "i" : "e"} non riconosciut${issue.keys.length > 1 ? "e" : "a"}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Chiave non valida in ${issue.origin}`;
            case "invalid_union":
                return "Input non valido";
            case "invalid_element":
                return `Valore non valido in ${issue.origin}`;
            default:
                return `Input non valido`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 7254:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "توکي", verb: "ولري" },
        file: { unit: "بایټس", verb: "ولري" },
        array: { unit: "توکي", verb: "ولري" },
        set: { unit: "توکي", verb: "ولري" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "عدد";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "ارې";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "ورودي",
        email: "بریښنالیک",
        url: "یو آر ال",
        emoji: "ایموجي",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "نیټه او وخت",
        date: "نېټه",
        time: "وخت",
        duration: "موده",
        ipv4: "د IPv4 پته",
        ipv6: "د IPv6 پته",
        cidrv4: "د IPv4 ساحه",
        cidrv6: "د IPv6 ساحه",
        base64: "base64-encoded متن",
        base64url: "base64url-encoded متن",
        json_string: "JSON متن",
        e164: "د E.164 شمېره",
        jwt: "JWT",
        template_literal: "ورودي",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `ناسم ورودي: باید ${issue.expected} وای, مګر ${parsedType(issue.input)} ترلاسه شو`;
            case "invalid_value":
                if (issue.values.length === 1) {
                    return `ناسم ورودي: باید ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])} وای`;
                }
                return `ناسم انتخاب: باید یو له ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")} څخه وای`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `ډیر لوی: ${issue.origin ?? "ارزښت"} باید ${adj}${issue.maximum.toString()} ${sizing.unit ?? "عنصرونه"} ولري`;
                }
                return `ډیر لوی: ${issue.origin ?? "ارزښت"} باید ${adj}${issue.maximum.toString()} وي`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `ډیر کوچنی: ${issue.origin} باید ${adj}${issue.minimum.toString()} ${sizing.unit} ولري`;
                }
                return `ډیر کوچنی: ${issue.origin} باید ${adj}${issue.minimum.toString()} وي`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with") {
                    return `ناسم متن: باید د "${_issue.prefix}" سره پیل شي`;
                }
                if (_issue.format === "ends_with") {
                    return `ناسم متن: باید د "${_issue.suffix}" سره پای ته ورسيږي`;
                }
                if (_issue.format === "includes") {
                    return `ناسم متن: باید "${_issue.includes}" ولري`;
                }
                if (_issue.format === "regex") {
                    return `ناسم متن: باید د ${_issue.pattern} سره مطابقت ولري`;
                }
                return `${Nouns[_issue.format] ?? issue.format} ناسم دی`;
            }
            case "not_multiple_of":
                return `ناسم عدد: باید د ${issue.divisor} مضرب وي`;
            case "unrecognized_keys":
                return `ناسم ${issue.keys.length > 1 ? "کلیډونه" : "کلیډ"}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `ناسم کلیډ په ${issue.origin} کې`;
            case "invalid_union":
                return `ناسمه ورودي`;
            case "invalid_element":
                return `ناسم عنصر په ${issue.origin} کې`;
            default:
                return `ناسمه ورودي`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 7300:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $brand: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$brand),
/* harmony export */   ZodFirstPartyTypeKind: () => (/* binding */ ZodFirstPartyTypeKind),
/* harmony export */   ZodIssueCode: () => (/* binding */ ZodIssueCode),
/* harmony export */   config: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.config),
/* harmony export */   getErrorMap: () => (/* binding */ getErrorMap),
/* harmony export */   setErrorMap: () => (/* binding */ setErrorMap)
/* harmony export */ });
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3259);
// Zod 3 compat layer

/** @deprecated Use the raw string literal codes instead, e.g. "invalid_type". */
const ZodIssueCode = {
    invalid_type: "invalid_type",
    too_big: "too_big",
    too_small: "too_small",
    invalid_format: "invalid_format",
    not_multiple_of: "not_multiple_of",
    unrecognized_keys: "unrecognized_keys",
    invalid_union: "invalid_union",
    invalid_key: "invalid_key",
    invalid_element: "invalid_element",
    invalid_value: "invalid_value",
    custom: "custom",
};

/** @deprecated Use `z.config(params)` instead. */
function setErrorMap(map) {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__.config({
        customError: map,
    });
}
/** @deprecated Use `z.config()` instead. */
function getErrorMap() {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_0__.config().customError;
}
/** @deprecated Do not use. Stub definition, only included for zod-to-json-schema compatibility. */
var ZodFirstPartyTypeKind;
(function (ZodFirstPartyTypeKind) {
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));


/***/ }),

/***/ 7348:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "simvol", verb: "olmalıdır" },
        file: { unit: "bayt", verb: "olmalıdır" },
        array: { unit: "element", verb: "olmalıdır" },
        set: { unit: "element", verb: "olmalıdır" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "number";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "array";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "input",
        email: "email address",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO datetime",
        date: "ISO date",
        time: "ISO time",
        duration: "ISO duration",
        ipv4: "IPv4 address",
        ipv6: "IPv6 address",
        cidrv4: "IPv4 range",
        cidrv6: "IPv6 range",
        base64: "base64-encoded string",
        base64url: "base64url-encoded string",
        json_string: "JSON string",
        e164: "E.164 number",
        jwt: "JWT",
        template_literal: "input",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Yanlış dəyər: gözlənilən ${issue.expected}, daxil olan ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Yanlış dəyər: gözlənilən ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Yanlış seçim: aşağıdakılardan biri olmalıdır: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Çox böyük: gözlənilən ${issue.origin ?? "dəyər"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "element"}`;
                return `Çox böyük: gözlənilən ${issue.origin ?? "dəyər"} ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Çox kiçik: gözlənilən ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                return `Çox kiçik: gözlənilən ${issue.origin} ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `Yanlış mətn: "${_issue.prefix}" ilə başlamalıdır`;
                if (_issue.format === "ends_with")
                    return `Yanlış mətn: "${_issue.suffix}" ilə bitməlidir`;
                if (_issue.format === "includes")
                    return `Yanlış mətn: "${_issue.includes}" daxil olmalıdır`;
                if (_issue.format === "regex")
                    return `Yanlış mətn: ${_issue.pattern} şablonuna uyğun olmalıdır`;
                return `Yanlış ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Yanlış ədəd: ${issue.divisor} ilə bölünə bilən olmalıdır`;
            case "unrecognized_keys":
                return `Tanınmayan açar${issue.keys.length > 1 ? "lar" : ""}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `${issue.origin} daxilində yanlış açar`;
            case "invalid_union":
                return "Yanlış dəyər";
            case "invalid_element":
                return `${issue.origin} daxilində yanlış dəyər`;
            default:
                return `Yanlış dəyər`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 7376:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decode: () => (/* binding */ decode),
/* harmony export */   decodeAsync: () => (/* binding */ decodeAsync),
/* harmony export */   encode: () => (/* binding */ encode),
/* harmony export */   encodeAsync: () => (/* binding */ encodeAsync),
/* harmony export */   parse: () => (/* binding */ parse),
/* harmony export */   parseAsync: () => (/* binding */ parseAsync),
/* harmony export */   safeDecode: () => (/* binding */ safeDecode),
/* harmony export */   safeDecodeAsync: () => (/* binding */ safeDecodeAsync),
/* harmony export */   safeEncode: () => (/* binding */ safeEncode),
/* harmony export */   safeEncodeAsync: () => (/* binding */ safeEncodeAsync),
/* harmony export */   safeParse: () => (/* binding */ safeParse),
/* harmony export */   safeParseAsync: () => (/* binding */ safeParseAsync)
/* harmony export */ });
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3259);
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6081);


const parse = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._parse(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
const parseAsync = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._parseAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
const safeParse = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._safeParse(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
const safeParseAsync = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._safeParseAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
// Codec functions
const encode = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._encode(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
const decode = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._decode(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
const encodeAsync = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._encodeAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
const decodeAsync = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._decodeAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
const safeEncode = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._safeEncode(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
const safeDecode = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._safeDecode(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
const safeEncodeAsync = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._safeEncodeAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
const safeDecodeAsync = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._safeDecodeAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);


/***/ }),

/***/ 7476:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $ZodAsyncError: () => (/* binding */ $ZodAsyncError),
/* harmony export */   $ZodEncodeError: () => (/* binding */ $ZodEncodeError),
/* harmony export */   $brand: () => (/* binding */ $brand),
/* harmony export */   $constructor: () => (/* binding */ $constructor),
/* harmony export */   NEVER: () => (/* binding */ NEVER),
/* harmony export */   config: () => (/* binding */ config),
/* harmony export */   globalConfig: () => (/* binding */ globalConfig)
/* harmony export */ });
/** A special constant with type `never` */
const NEVER = Object.freeze({
    status: "aborted",
});
function $constructor(name, initializer, params) {
    function init(inst, def) {
        var _a;
        Object.defineProperty(inst, "_zod", {
            value: inst._zod ?? {},
            enumerable: false,
        });
        (_a = inst._zod).traits ?? (_a.traits = new Set());
        inst._zod.traits.add(name);
        initializer(inst, def);
        // support prototype modifications
        for (const k in _.prototype) {
            if (!(k in inst))
                Object.defineProperty(inst, k, { value: _.prototype[k].bind(inst) });
        }
        inst._zod.constr = _;
        inst._zod.def = def;
    }
    // doesn't work if Parent has a constructor with arguments
    const Parent = params?.Parent ?? Object;
    class Definition extends Parent {
    }
    Object.defineProperty(Definition, "name", { value: name });
    function _(def) {
        var _a;
        const inst = params?.Parent ? new Definition() : this;
        init(inst, def);
        (_a = inst._zod).deferred ?? (_a.deferred = []);
        for (const fn of inst._zod.deferred) {
            fn();
        }
        return inst;
    }
    Object.defineProperty(_, "init", { value: init });
    Object.defineProperty(_, Symbol.hasInstance, {
        value: (inst) => {
            if (params?.Parent && inst instanceof params.Parent)
                return true;
            return inst?._zod?.traits?.has(name);
        },
    });
    Object.defineProperty(_, "name", { value: name });
    return _;
}
//////////////////////////////   UTILITIES   ///////////////////////////////////////
const $brand = Symbol("zod_brand");
class $ZodAsyncError extends Error {
    constructor() {
        super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
    }
}
class $ZodEncodeError extends Error {
    constructor(name) {
        super(`Encountered unidirectional transform during encode: ${name}`);
        this.name = "ZodEncodeError";
    }
}
const globalConfig = {};
function config(newConfig) {
    if (newConfig)
        Object.assign(globalConfig, newConfig);
    return globalConfig;
}


/***/ }),

/***/ 7759:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MvuDataSchema: () => (/* binding */ MvuDataSchema),
/* harmony export */   UserRoleSchema: () => (/* binding */ UserRoleSchema),
/* harmony export */   VALID_ROUTES: () => (/* binding */ VALID_ROUTES),
/* harmony export */   VALID_STAGES: () => (/* binding */ VALID_STAGES),
/* harmony export */   WorldRecordSchema: () => (/* binding */ WorldRecordSchema)
/* harmony export */ });
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5936);

// Zod schemas for data validation
const WorldRecordSchema = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    当前日期: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    当前时间: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    全局设置: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        NSFW总开关: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().optional(),
        内容强度: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
        随机性开关: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().optional(),
    }).optional(),
    当前场景: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        地点名称: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
        环境氛围: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
        在场角色: zod__WEBPACK_IMPORTED_MODULE_0__.z.record(zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean()).optional(),
        核心事件: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
        天气: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    }).optional(),
}).catchall(zod__WEBPACK_IMPORTED_MODULE_0__.z.any());
const UserRoleSchema = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    基础身份: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    当前阶段: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    玩家偏好: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        开局路线选择: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
        职业身份: zod__WEBPACK_IMPORTED_MODULE_0__.z.union([
            zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
            zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
                职业: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
                野心: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
            })
        ]).optional(),
        XP雷达: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
            核心性癖_Likes: zod__WEBPACK_IMPORTED_MODULE_0__.z.array(zod__WEBPACK_IMPORTED_MODULE_0__.z.string()).optional(),
            软限_可尝试: zod__WEBPACK_IMPORTED_MODULE_0__.z.array(zod__WEBPACK_IMPORTED_MODULE_0__.z.string()).optional(),
            绝对禁区_HardLimits: zod__WEBPACK_IMPORTED_MODULE_0__.z.array(zod__WEBPACK_IMPORTED_MODULE_0__.z.string()).optional(),
        }).optional(),
        互动边界: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
            安全词: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
                黄灯_调整: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
                红灯_停止: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
            }).optional(),
        }).optional(),
    }).optional(),
    造物逻辑: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        发展路径: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
            核心定位: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
            权重配置: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
                肉体比重: zod__WEBPACK_IMPORTED_MODULE_0__.z.number().optional(),
                事业比重: zod__WEBPACK_IMPORTED_MODULE_0__.z.number().optional(),
            }).optional(),
        }).optional(),
        定制课程: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
            今日重点: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
                事业任务: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
                肉体任务: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
                今日安排列表: zod__WEBPACK_IMPORTED_MODULE_0__.z.array(zod__WEBPACK_IMPORTED_MODULE_0__.z.string()).optional(),
                时段侧重: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
            }).optional(),
        }).optional(),
        上一次SOP_ID: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
        当前SOP_活跃状态: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().optional(),
    }).optional(),
    生理开发: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        部位图谱: zod__WEBPACK_IMPORTED_MODULE_0__.z.record(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
            状态: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
        })).optional(),
    }).optional(),
}).catchall(zod__WEBPACK_IMPORTED_MODULE_0__.z.any());
const MvuDataSchema = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    stat_data: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        世界记录: WorldRecordSchema.optional(),
        角色档案: zod__WEBPACK_IMPORTED_MODULE_0__.z.record(UserRoleSchema).optional(),
    }).optional(),
}).catchall(zod__WEBPACK_IMPORTED_MODULE_0__.z.any());
// Stage definitions
const VALID_STAGES = ['甄选阶段', '引路阶段', '作品阶段', '藏品阶段'];
// Route types
const VALID_ROUTES = ['璞玉路线_事业', '玩物路线_走肾'];


/***/ }),

/***/ 7942:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   version: () => (/* binding */ version)
/* harmony export */ });
const version = {
    major: 4,
    minor: 1,
    patch: 3,
};


/***/ }),

/***/ 7991:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "字符", verb: "包含" },
        file: { unit: "字节", verb: "包含" },
        array: { unit: "项", verb: "包含" },
        set: { unit: "项", verb: "包含" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "非数字(NaN)" : "数字";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "数组";
                }
                if (data === null) {
                    return "空值(null)";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "输入",
        email: "电子邮件",
        url: "URL",
        emoji: "表情符号",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO日期时间",
        date: "ISO日期",
        time: "ISO时间",
        duration: "ISO时长",
        ipv4: "IPv4地址",
        ipv6: "IPv6地址",
        cidrv4: "IPv4网段",
        cidrv6: "IPv6网段",
        base64: "base64编码字符串",
        base64url: "base64url编码字符串",
        json_string: "JSON字符串",
        e164: "E.164号码",
        jwt: "JWT",
        template_literal: "输入",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `无效输入：期望 ${issue.expected}，实际接收 ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `无效输入：期望 ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `无效选项：期望以下之一 ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `数值过大：期望 ${issue.origin ?? "值"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "个元素"}`;
                return `数值过大：期望 ${issue.origin ?? "值"} ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `数值过小：期望 ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `数值过小：期望 ${issue.origin} ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `无效字符串：必须以 "${_issue.prefix}" 开头`;
                if (_issue.format === "ends_with")
                    return `无效字符串：必须以 "${_issue.suffix}" 结尾`;
                if (_issue.format === "includes")
                    return `无效字符串：必须包含 "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `无效字符串：必须满足正则表达式 ${_issue.pattern}`;
                return `无效${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `无效数字：必须是 ${issue.divisor} 的倍数`;
            case "unrecognized_keys":
                return `出现未知的键(key): ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `${issue.origin} 中的键(key)无效`;
            case "invalid_union":
                return "无效输入";
            case "invalid_element":
                return `${issue.origin} 中包含无效值(value)`;
            default:
                return `无效输入`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 8250:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $ZodCheck: () => (/* binding */ $ZodCheck),
/* harmony export */   $ZodCheckBigIntFormat: () => (/* binding */ $ZodCheckBigIntFormat),
/* harmony export */   $ZodCheckEndsWith: () => (/* binding */ $ZodCheckEndsWith),
/* harmony export */   $ZodCheckGreaterThan: () => (/* binding */ $ZodCheckGreaterThan),
/* harmony export */   $ZodCheckIncludes: () => (/* binding */ $ZodCheckIncludes),
/* harmony export */   $ZodCheckLengthEquals: () => (/* binding */ $ZodCheckLengthEquals),
/* harmony export */   $ZodCheckLessThan: () => (/* binding */ $ZodCheckLessThan),
/* harmony export */   $ZodCheckLowerCase: () => (/* binding */ $ZodCheckLowerCase),
/* harmony export */   $ZodCheckMaxLength: () => (/* binding */ $ZodCheckMaxLength),
/* harmony export */   $ZodCheckMaxSize: () => (/* binding */ $ZodCheckMaxSize),
/* harmony export */   $ZodCheckMimeType: () => (/* binding */ $ZodCheckMimeType),
/* harmony export */   $ZodCheckMinLength: () => (/* binding */ $ZodCheckMinLength),
/* harmony export */   $ZodCheckMinSize: () => (/* binding */ $ZodCheckMinSize),
/* harmony export */   $ZodCheckMultipleOf: () => (/* binding */ $ZodCheckMultipleOf),
/* harmony export */   $ZodCheckNumberFormat: () => (/* binding */ $ZodCheckNumberFormat),
/* harmony export */   $ZodCheckOverwrite: () => (/* binding */ $ZodCheckOverwrite),
/* harmony export */   $ZodCheckProperty: () => (/* binding */ $ZodCheckProperty),
/* harmony export */   $ZodCheckRegex: () => (/* binding */ $ZodCheckRegex),
/* harmony export */   $ZodCheckSizeEquals: () => (/* binding */ $ZodCheckSizeEquals),
/* harmony export */   $ZodCheckStartsWith: () => (/* binding */ $ZodCheckStartsWith),
/* harmony export */   $ZodCheckStringFormat: () => (/* binding */ $ZodCheckStringFormat),
/* harmony export */   $ZodCheckUpperCase: () => (/* binding */ $ZodCheckUpperCase)
/* harmony export */ });
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7476);
/* harmony import */ var _regexes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2996);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4995);
// import { $ZodType } from "./schemas.js";



const $ZodCheck = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheck", (inst, def) => {
    var _a;
    inst._zod ?? (inst._zod = {});
    inst._zod.def = def;
    (_a = inst._zod).onattach ?? (_a.onattach = []);
});
const numericOriginMap = {
    number: "number",
    bigint: "bigint",
    object: "date",
};
const $ZodCheckLessThan = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckLessThan", (inst, def) => {
    $ZodCheck.init(inst, def);
    const origin = numericOriginMap[typeof def.value];
    inst._zod.onattach.push((inst) => {
        const bag = inst._zod.bag;
        const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
        if (def.value < curr) {
            if (def.inclusive)
                bag.maximum = def.value;
            else
                bag.exclusiveMaximum = def.value;
        }
    });
    inst._zod.check = (payload) => {
        if (def.inclusive ? payload.value <= def.value : payload.value < def.value) {
            return;
        }
        payload.issues.push({
            origin,
            code: "too_big",
            maximum: def.value,
            input: payload.value,
            inclusive: def.inclusive,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckGreaterThan = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckGreaterThan", (inst, def) => {
    $ZodCheck.init(inst, def);
    const origin = numericOriginMap[typeof def.value];
    inst._zod.onattach.push((inst) => {
        const bag = inst._zod.bag;
        const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
        if (def.value > curr) {
            if (def.inclusive)
                bag.minimum = def.value;
            else
                bag.exclusiveMinimum = def.value;
        }
    });
    inst._zod.check = (payload) => {
        if (def.inclusive ? payload.value >= def.value : payload.value > def.value) {
            return;
        }
        payload.issues.push({
            origin,
            code: "too_small",
            minimum: def.value,
            input: payload.value,
            inclusive: def.inclusive,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckMultipleOf = 
/*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckMultipleOf", (inst, def) => {
    $ZodCheck.init(inst, def);
    inst._zod.onattach.push((inst) => {
        var _a;
        (_a = inst._zod.bag).multipleOf ?? (_a.multipleOf = def.value);
    });
    inst._zod.check = (payload) => {
        if (typeof payload.value !== typeof def.value)
            throw new Error("Cannot mix number and bigint in multiple_of check.");
        const isMultiple = typeof payload.value === "bigint"
            ? payload.value % def.value === BigInt(0)
            : _util_js__WEBPACK_IMPORTED_MODULE_2__.floatSafeRemainder(payload.value, def.value) === 0;
        if (isMultiple)
            return;
        payload.issues.push({
            origin: typeof payload.value,
            code: "not_multiple_of",
            divisor: def.value,
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckNumberFormat = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckNumberFormat", (inst, def) => {
    $ZodCheck.init(inst, def); // no format checks
    def.format = def.format || "float64";
    const isInt = def.format?.includes("int");
    const origin = isInt ? "int" : "number";
    const [minimum, maximum] = _util_js__WEBPACK_IMPORTED_MODULE_2__.NUMBER_FORMAT_RANGES[def.format];
    inst._zod.onattach.push((inst) => {
        const bag = inst._zod.bag;
        bag.format = def.format;
        bag.minimum = minimum;
        bag.maximum = maximum;
        if (isInt)
            bag.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_1__.integer;
    });
    inst._zod.check = (payload) => {
        const input = payload.value;
        if (isInt) {
            if (!Number.isInteger(input)) {
                // invalid_format issue
                // payload.issues.push({
                //   expected: def.format,
                //   format: def.format,
                //   code: "invalid_format",
                //   input,
                //   inst,
                // });
                // invalid_type issue
                payload.issues.push({
                    expected: origin,
                    format: def.format,
                    code: "invalid_type",
                    continue: false,
                    input,
                    inst,
                });
                return;
                // not_multiple_of issue
                // payload.issues.push({
                //   code: "not_multiple_of",
                //   origin: "number",
                //   input,
                //   inst,
                //   divisor: 1,
                // });
            }
            if (!Number.isSafeInteger(input)) {
                if (input > 0) {
                    // too_big
                    payload.issues.push({
                        input,
                        code: "too_big",
                        maximum: Number.MAX_SAFE_INTEGER,
                        note: "Integers must be within the safe integer range.",
                        inst,
                        origin,
                        continue: !def.abort,
                    });
                }
                else {
                    // too_small
                    payload.issues.push({
                        input,
                        code: "too_small",
                        minimum: Number.MIN_SAFE_INTEGER,
                        note: "Integers must be within the safe integer range.",
                        inst,
                        origin,
                        continue: !def.abort,
                    });
                }
                return;
            }
        }
        if (input < minimum) {
            payload.issues.push({
                origin: "number",
                input,
                code: "too_small",
                minimum,
                inclusive: true,
                inst,
                continue: !def.abort,
            });
        }
        if (input > maximum) {
            payload.issues.push({
                origin: "number",
                input,
                code: "too_big",
                maximum,
                inst,
            });
        }
    };
});
const $ZodCheckBigIntFormat = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckBigIntFormat", (inst, def) => {
    $ZodCheck.init(inst, def); // no format checks
    const [minimum, maximum] = _util_js__WEBPACK_IMPORTED_MODULE_2__.BIGINT_FORMAT_RANGES[def.format];
    inst._zod.onattach.push((inst) => {
        const bag = inst._zod.bag;
        bag.format = def.format;
        bag.minimum = minimum;
        bag.maximum = maximum;
    });
    inst._zod.check = (payload) => {
        const input = payload.value;
        if (input < minimum) {
            payload.issues.push({
                origin: "bigint",
                input,
                code: "too_small",
                minimum: minimum,
                inclusive: true,
                inst,
                continue: !def.abort,
            });
        }
        if (input > maximum) {
            payload.issues.push({
                origin: "bigint",
                input,
                code: "too_big",
                maximum,
                inst,
            });
        }
    };
});
const $ZodCheckMaxSize = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckMaxSize", (inst, def) => {
    var _a;
    $ZodCheck.init(inst, def);
    (_a = inst._zod.def).when ?? (_a.when = (payload) => {
        const val = payload.value;
        return !_util_js__WEBPACK_IMPORTED_MODULE_2__.nullish(val) && val.size !== undefined;
    });
    inst._zod.onattach.push((inst) => {
        const curr = (inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY);
        if (def.maximum < curr)
            inst._zod.bag.maximum = def.maximum;
    });
    inst._zod.check = (payload) => {
        const input = payload.value;
        const size = input.size;
        if (size <= def.maximum)
            return;
        payload.issues.push({
            origin: _util_js__WEBPACK_IMPORTED_MODULE_2__.getSizableOrigin(input),
            code: "too_big",
            maximum: def.maximum,
            inclusive: true,
            input,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckMinSize = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckMinSize", (inst, def) => {
    var _a;
    $ZodCheck.init(inst, def);
    (_a = inst._zod.def).when ?? (_a.when = (payload) => {
        const val = payload.value;
        return !_util_js__WEBPACK_IMPORTED_MODULE_2__.nullish(val) && val.size !== undefined;
    });
    inst._zod.onattach.push((inst) => {
        const curr = (inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY);
        if (def.minimum > curr)
            inst._zod.bag.minimum = def.minimum;
    });
    inst._zod.check = (payload) => {
        const input = payload.value;
        const size = input.size;
        if (size >= def.minimum)
            return;
        payload.issues.push({
            origin: _util_js__WEBPACK_IMPORTED_MODULE_2__.getSizableOrigin(input),
            code: "too_small",
            minimum: def.minimum,
            inclusive: true,
            input,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckSizeEquals = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckSizeEquals", (inst, def) => {
    var _a;
    $ZodCheck.init(inst, def);
    (_a = inst._zod.def).when ?? (_a.when = (payload) => {
        const val = payload.value;
        return !_util_js__WEBPACK_IMPORTED_MODULE_2__.nullish(val) && val.size !== undefined;
    });
    inst._zod.onattach.push((inst) => {
        const bag = inst._zod.bag;
        bag.minimum = def.size;
        bag.maximum = def.size;
        bag.size = def.size;
    });
    inst._zod.check = (payload) => {
        const input = payload.value;
        const size = input.size;
        if (size === def.size)
            return;
        const tooBig = size > def.size;
        payload.issues.push({
            origin: _util_js__WEBPACK_IMPORTED_MODULE_2__.getSizableOrigin(input),
            ...(tooBig ? { code: "too_big", maximum: def.size } : { code: "too_small", minimum: def.size }),
            inclusive: true,
            exact: true,
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckMaxLength = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckMaxLength", (inst, def) => {
    var _a;
    $ZodCheck.init(inst, def);
    (_a = inst._zod.def).when ?? (_a.when = (payload) => {
        const val = payload.value;
        return !_util_js__WEBPACK_IMPORTED_MODULE_2__.nullish(val) && val.length !== undefined;
    });
    inst._zod.onattach.push((inst) => {
        const curr = (inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY);
        if (def.maximum < curr)
            inst._zod.bag.maximum = def.maximum;
    });
    inst._zod.check = (payload) => {
        const input = payload.value;
        const length = input.length;
        if (length <= def.maximum)
            return;
        const origin = _util_js__WEBPACK_IMPORTED_MODULE_2__.getLengthableOrigin(input);
        payload.issues.push({
            origin,
            code: "too_big",
            maximum: def.maximum,
            inclusive: true,
            input,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckMinLength = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckMinLength", (inst, def) => {
    var _a;
    $ZodCheck.init(inst, def);
    (_a = inst._zod.def).when ?? (_a.when = (payload) => {
        const val = payload.value;
        return !_util_js__WEBPACK_IMPORTED_MODULE_2__.nullish(val) && val.length !== undefined;
    });
    inst._zod.onattach.push((inst) => {
        const curr = (inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY);
        if (def.minimum > curr)
            inst._zod.bag.minimum = def.minimum;
    });
    inst._zod.check = (payload) => {
        const input = payload.value;
        const length = input.length;
        if (length >= def.minimum)
            return;
        const origin = _util_js__WEBPACK_IMPORTED_MODULE_2__.getLengthableOrigin(input);
        payload.issues.push({
            origin,
            code: "too_small",
            minimum: def.minimum,
            inclusive: true,
            input,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckLengthEquals = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckLengthEquals", (inst, def) => {
    var _a;
    $ZodCheck.init(inst, def);
    (_a = inst._zod.def).when ?? (_a.when = (payload) => {
        const val = payload.value;
        return !_util_js__WEBPACK_IMPORTED_MODULE_2__.nullish(val) && val.length !== undefined;
    });
    inst._zod.onattach.push((inst) => {
        const bag = inst._zod.bag;
        bag.minimum = def.length;
        bag.maximum = def.length;
        bag.length = def.length;
    });
    inst._zod.check = (payload) => {
        const input = payload.value;
        const length = input.length;
        if (length === def.length)
            return;
        const origin = _util_js__WEBPACK_IMPORTED_MODULE_2__.getLengthableOrigin(input);
        const tooBig = length > def.length;
        payload.issues.push({
            origin,
            ...(tooBig ? { code: "too_big", maximum: def.length } : { code: "too_small", minimum: def.length }),
            inclusive: true,
            exact: true,
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckStringFormat = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckStringFormat", (inst, def) => {
    var _a, _b;
    $ZodCheck.init(inst, def);
    inst._zod.onattach.push((inst) => {
        const bag = inst._zod.bag;
        bag.format = def.format;
        if (def.pattern) {
            bag.patterns ?? (bag.patterns = new Set());
            bag.patterns.add(def.pattern);
        }
    });
    if (def.pattern)
        (_a = inst._zod).check ?? (_a.check = (payload) => {
            def.pattern.lastIndex = 0;
            if (def.pattern.test(payload.value))
                return;
            payload.issues.push({
                origin: "string",
                code: "invalid_format",
                format: def.format,
                input: payload.value,
                ...(def.pattern ? { pattern: def.pattern.toString() } : {}),
                inst,
                continue: !def.abort,
            });
        });
    else
        (_b = inst._zod).check ?? (_b.check = () => { });
});
const $ZodCheckRegex = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckRegex", (inst, def) => {
    $ZodCheckStringFormat.init(inst, def);
    inst._zod.check = (payload) => {
        def.pattern.lastIndex = 0;
        if (def.pattern.test(payload.value))
            return;
        payload.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "regex",
            input: payload.value,
            pattern: def.pattern.toString(),
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckLowerCase = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckLowerCase", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_1__.lowercase);
    $ZodCheckStringFormat.init(inst, def);
});
const $ZodCheckUpperCase = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckUpperCase", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_1__.uppercase);
    $ZodCheckStringFormat.init(inst, def);
});
const $ZodCheckIncludes = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckIncludes", (inst, def) => {
    $ZodCheck.init(inst, def);
    const escapedRegex = _util_js__WEBPACK_IMPORTED_MODULE_2__.escapeRegex(def.includes);
    const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
    def.pattern = pattern;
    inst._zod.onattach.push((inst) => {
        const bag = inst._zod.bag;
        bag.patterns ?? (bag.patterns = new Set());
        bag.patterns.add(pattern);
    });
    inst._zod.check = (payload) => {
        if (payload.value.includes(def.includes, def.position))
            return;
        payload.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "includes",
            includes: def.includes,
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckStartsWith = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckStartsWith", (inst, def) => {
    $ZodCheck.init(inst, def);
    const pattern = new RegExp(`^${_util_js__WEBPACK_IMPORTED_MODULE_2__.escapeRegex(def.prefix)}.*`);
    def.pattern ?? (def.pattern = pattern);
    inst._zod.onattach.push((inst) => {
        const bag = inst._zod.bag;
        bag.patterns ?? (bag.patterns = new Set());
        bag.patterns.add(pattern);
    });
    inst._zod.check = (payload) => {
        if (payload.value.startsWith(def.prefix))
            return;
        payload.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "starts_with",
            prefix: def.prefix,
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckEndsWith = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckEndsWith", (inst, def) => {
    $ZodCheck.init(inst, def);
    const pattern = new RegExp(`.*${_util_js__WEBPACK_IMPORTED_MODULE_2__.escapeRegex(def.suffix)}$`);
    def.pattern ?? (def.pattern = pattern);
    inst._zod.onattach.push((inst) => {
        const bag = inst._zod.bag;
        bag.patterns ?? (bag.patterns = new Set());
        bag.patterns.add(pattern);
    });
    inst._zod.check = (payload) => {
        if (payload.value.endsWith(def.suffix))
            return;
        payload.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "ends_with",
            suffix: def.suffix,
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
///////////////////////////////////
/////    $ZodCheckProperty    /////
///////////////////////////////////
function handleCheckPropertyResult(result, payload, property) {
    if (result.issues.length) {
        payload.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_2__.prefixIssues(property, result.issues));
    }
}
const $ZodCheckProperty = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckProperty", (inst, def) => {
    $ZodCheck.init(inst, def);
    inst._zod.check = (payload) => {
        const result = def.schema._zod.run({
            value: payload.value[def.property],
            issues: [],
        }, {});
        if (result instanceof Promise) {
            return result.then((result) => handleCheckPropertyResult(result, payload, def.property));
        }
        handleCheckPropertyResult(result, payload, def.property);
        return;
    };
});
const $ZodCheckMimeType = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckMimeType", (inst, def) => {
    $ZodCheck.init(inst, def);
    const mimeSet = new Set(def.mime);
    inst._zod.onattach.push((inst) => {
        inst._zod.bag.mime = def.mime;
    });
    inst._zod.check = (payload) => {
        if (mimeSet.has(payload.value.type))
            return;
        payload.issues.push({
            code: "invalid_value",
            values: def.mime,
            input: payload.value.type,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckOverwrite = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckOverwrite", (inst, def) => {
    $ZodCheck.init(inst, def);
    inst._zod.check = (payload) => {
        payload.value = def.tx(payload.value);
    };
});


/***/ }),

/***/ 8261:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $brand: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$brand),
/* harmony export */   $input: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$input),
/* harmony export */   $output: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$output),
/* harmony export */   NEVER: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.NEVER),
/* harmony export */   TimePrecision: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.TimePrecision),
/* harmony export */   ZodAny: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodAny),
/* harmony export */   ZodArray: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodArray),
/* harmony export */   ZodBase64: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodBase64),
/* harmony export */   ZodBase64URL: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodBase64URL),
/* harmony export */   ZodBigInt: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodBigInt),
/* harmony export */   ZodBigIntFormat: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodBigIntFormat),
/* harmony export */   ZodBoolean: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodBoolean),
/* harmony export */   ZodCIDRv4: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodCIDRv4),
/* harmony export */   ZodCIDRv6: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodCIDRv6),
/* harmony export */   ZodCUID: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodCUID),
/* harmony export */   ZodCUID2: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodCUID2),
/* harmony export */   ZodCatch: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodCatch),
/* harmony export */   ZodCodec: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodCodec),
/* harmony export */   ZodCustom: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodCustom),
/* harmony export */   ZodCustomStringFormat: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodCustomStringFormat),
/* harmony export */   ZodDate: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodDate),
/* harmony export */   ZodDefault: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodDefault),
/* harmony export */   ZodDiscriminatedUnion: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodDiscriminatedUnion),
/* harmony export */   ZodE164: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodE164),
/* harmony export */   ZodEmail: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodEmail),
/* harmony export */   ZodEmoji: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodEmoji),
/* harmony export */   ZodEnum: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodEnum),
/* harmony export */   ZodError: () => (/* reexport safe */ _errors_js__WEBPACK_IMPORTED_MODULE_3__.ZodError),
/* harmony export */   ZodFile: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodFile),
/* harmony export */   ZodFirstPartyTypeKind: () => (/* reexport safe */ _compat_js__WEBPACK_IMPORTED_MODULE_5__.ZodFirstPartyTypeKind),
/* harmony export */   ZodFunction: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodFunction),
/* harmony export */   ZodGUID: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodGUID),
/* harmony export */   ZodIPv4: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodIPv4),
/* harmony export */   ZodIPv6: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodIPv6),
/* harmony export */   ZodISODate: () => (/* reexport safe */ _iso_js__WEBPACK_IMPORTED_MODULE_8__.ZodISODate),
/* harmony export */   ZodISODateTime: () => (/* reexport safe */ _iso_js__WEBPACK_IMPORTED_MODULE_8__.ZodISODateTime),
/* harmony export */   ZodISODuration: () => (/* reexport safe */ _iso_js__WEBPACK_IMPORTED_MODULE_8__.ZodISODuration),
/* harmony export */   ZodISOTime: () => (/* reexport safe */ _iso_js__WEBPACK_IMPORTED_MODULE_8__.ZodISOTime),
/* harmony export */   ZodIntersection: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodIntersection),
/* harmony export */   ZodIssueCode: () => (/* reexport safe */ _compat_js__WEBPACK_IMPORTED_MODULE_5__.ZodIssueCode),
/* harmony export */   ZodJWT: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodJWT),
/* harmony export */   ZodKSUID: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodKSUID),
/* harmony export */   ZodLazy: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodLazy),
/* harmony export */   ZodLiteral: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodLiteral),
/* harmony export */   ZodMap: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodMap),
/* harmony export */   ZodNaN: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodNaN),
/* harmony export */   ZodNanoID: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodNanoID),
/* harmony export */   ZodNever: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodNever),
/* harmony export */   ZodNonOptional: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodNonOptional),
/* harmony export */   ZodNull: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodNull),
/* harmony export */   ZodNullable: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodNullable),
/* harmony export */   ZodNumber: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodNumber),
/* harmony export */   ZodNumberFormat: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodNumberFormat),
/* harmony export */   ZodObject: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodObject),
/* harmony export */   ZodOptional: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodOptional),
/* harmony export */   ZodPipe: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodPipe),
/* harmony export */   ZodPrefault: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodPrefault),
/* harmony export */   ZodPromise: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodPromise),
/* harmony export */   ZodReadonly: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodReadonly),
/* harmony export */   ZodRealError: () => (/* reexport safe */ _errors_js__WEBPACK_IMPORTED_MODULE_3__.ZodRealError),
/* harmony export */   ZodRecord: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodRecord),
/* harmony export */   ZodSet: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodSet),
/* harmony export */   ZodString: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodString),
/* harmony export */   ZodStringFormat: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodStringFormat),
/* harmony export */   ZodSuccess: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodSuccess),
/* harmony export */   ZodSymbol: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodSymbol),
/* harmony export */   ZodTemplateLiteral: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodTemplateLiteral),
/* harmony export */   ZodTransform: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodTransform),
/* harmony export */   ZodTuple: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodTuple),
/* harmony export */   ZodType: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodType),
/* harmony export */   ZodULID: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodULID),
/* harmony export */   ZodURL: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodURL),
/* harmony export */   ZodUUID: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodUUID),
/* harmony export */   ZodUndefined: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodUndefined),
/* harmony export */   ZodUnion: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodUnion),
/* harmony export */   ZodUnknown: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodUnknown),
/* harmony export */   ZodVoid: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodVoid),
/* harmony export */   ZodXID: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ZodXID),
/* harmony export */   _ZodString: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__._ZodString),
/* harmony export */   _default: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__._default),
/* harmony export */   _function: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__._function),
/* harmony export */   any: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.any),
/* harmony export */   array: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.array),
/* harmony export */   base64: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.base64),
/* harmony export */   base64url: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.base64url),
/* harmony export */   bigint: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.bigint),
/* harmony export */   boolean: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.boolean),
/* harmony export */   "catch": () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__["catch"]),
/* harmony export */   check: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.check),
/* harmony export */   cidrv4: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.cidrv4),
/* harmony export */   cidrv6: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.cidrv6),
/* harmony export */   clone: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.clone),
/* harmony export */   codec: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.codec),
/* harmony export */   coerce: () => (/* reexport module object */ _coerce_js__WEBPACK_IMPORTED_MODULE_9__),
/* harmony export */   config: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.config),
/* harmony export */   core: () => (/* reexport module object */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   cuid: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.cuid),
/* harmony export */   cuid2: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.cuid2),
/* harmony export */   custom: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.custom),
/* harmony export */   date: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.date),
/* harmony export */   decode: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_4__.decode),
/* harmony export */   decodeAsync: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_4__.decodeAsync),
/* harmony export */   discriminatedUnion: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.discriminatedUnion),
/* harmony export */   e164: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.e164),
/* harmony export */   email: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.email),
/* harmony export */   emoji: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.emoji),
/* harmony export */   encode: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_4__.encode),
/* harmony export */   encodeAsync: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_4__.encodeAsync),
/* harmony export */   endsWith: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.endsWith),
/* harmony export */   "enum": () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__["enum"]),
/* harmony export */   file: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.file),
/* harmony export */   flattenError: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.flattenError),
/* harmony export */   float32: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.float32),
/* harmony export */   float64: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.float64),
/* harmony export */   formatError: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.formatError),
/* harmony export */   "function": () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__["function"]),
/* harmony export */   getErrorMap: () => (/* reexport safe */ _compat_js__WEBPACK_IMPORTED_MODULE_5__.getErrorMap),
/* harmony export */   globalRegistry: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.globalRegistry),
/* harmony export */   gt: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.gt),
/* harmony export */   gte: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.gte),
/* harmony export */   guid: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.guid),
/* harmony export */   hash: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.hash),
/* harmony export */   hex: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.hex),
/* harmony export */   hostname: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.hostname),
/* harmony export */   httpUrl: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.httpUrl),
/* harmony export */   includes: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.includes),
/* harmony export */   "instanceof": () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__["instanceof"]),
/* harmony export */   int: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.int),
/* harmony export */   int32: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.int32),
/* harmony export */   int64: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.int64),
/* harmony export */   intersection: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.intersection),
/* harmony export */   ipv4: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ipv4),
/* harmony export */   ipv6: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ipv6),
/* harmony export */   iso: () => (/* reexport module object */ _iso_js__WEBPACK_IMPORTED_MODULE_8__),
/* harmony export */   json: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.json),
/* harmony export */   jwt: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.jwt),
/* harmony export */   keyof: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.keyof),
/* harmony export */   ksuid: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ksuid),
/* harmony export */   lazy: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.lazy),
/* harmony export */   length: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.length),
/* harmony export */   literal: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.literal),
/* harmony export */   locales: () => (/* reexport module object */ _locales_index_js__WEBPACK_IMPORTED_MODULE_7__),
/* harmony export */   looseObject: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.looseObject),
/* harmony export */   lowercase: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.lowercase),
/* harmony export */   lt: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.lt),
/* harmony export */   lte: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.lte),
/* harmony export */   map: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.map),
/* harmony export */   maxLength: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.maxLength),
/* harmony export */   maxSize: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.maxSize),
/* harmony export */   mime: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.mime),
/* harmony export */   minLength: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.minLength),
/* harmony export */   minSize: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.minSize),
/* harmony export */   multipleOf: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.multipleOf),
/* harmony export */   nan: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.nan),
/* harmony export */   nanoid: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.nanoid),
/* harmony export */   nativeEnum: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.nativeEnum),
/* harmony export */   negative: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.negative),
/* harmony export */   never: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.never),
/* harmony export */   nonnegative: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.nonnegative),
/* harmony export */   nonoptional: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.nonoptional),
/* harmony export */   nonpositive: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.nonpositive),
/* harmony export */   normalize: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.normalize),
/* harmony export */   "null": () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__["null"]),
/* harmony export */   nullable: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.nullable),
/* harmony export */   nullish: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.nullish),
/* harmony export */   number: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.number),
/* harmony export */   object: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.object),
/* harmony export */   optional: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.optional),
/* harmony export */   overwrite: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.overwrite),
/* harmony export */   parse: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_4__.parse),
/* harmony export */   parseAsync: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_4__.parseAsync),
/* harmony export */   partialRecord: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.partialRecord),
/* harmony export */   pipe: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.pipe),
/* harmony export */   positive: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.positive),
/* harmony export */   prefault: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.prefault),
/* harmony export */   preprocess: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.preprocess),
/* harmony export */   prettifyError: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.prettifyError),
/* harmony export */   promise: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.promise),
/* harmony export */   property: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.property),
/* harmony export */   readonly: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.readonly),
/* harmony export */   record: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.record),
/* harmony export */   refine: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.refine),
/* harmony export */   regex: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.regex),
/* harmony export */   regexes: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.regexes),
/* harmony export */   registry: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.registry),
/* harmony export */   safeDecode: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_4__.safeDecode),
/* harmony export */   safeDecodeAsync: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_4__.safeDecodeAsync),
/* harmony export */   safeEncode: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_4__.safeEncode),
/* harmony export */   safeEncodeAsync: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_4__.safeEncodeAsync),
/* harmony export */   safeParse: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_4__.safeParse),
/* harmony export */   safeParseAsync: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_4__.safeParseAsync),
/* harmony export */   set: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.set),
/* harmony export */   setErrorMap: () => (/* reexport safe */ _compat_js__WEBPACK_IMPORTED_MODULE_5__.setErrorMap),
/* harmony export */   size: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.size),
/* harmony export */   startsWith: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.startsWith),
/* harmony export */   strictObject: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.strictObject),
/* harmony export */   string: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.string),
/* harmony export */   stringFormat: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.stringFormat),
/* harmony export */   stringbool: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.stringbool),
/* harmony export */   success: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.success),
/* harmony export */   superRefine: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.superRefine),
/* harmony export */   symbol: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.symbol),
/* harmony export */   templateLiteral: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.templateLiteral),
/* harmony export */   toJSONSchema: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.toJSONSchema),
/* harmony export */   toLowerCase: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.toLowerCase),
/* harmony export */   toUpperCase: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.toUpperCase),
/* harmony export */   transform: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.transform),
/* harmony export */   treeifyError: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.treeifyError),
/* harmony export */   trim: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.trim),
/* harmony export */   tuple: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.tuple),
/* harmony export */   uint32: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.uint32),
/* harmony export */   uint64: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.uint64),
/* harmony export */   ulid: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.ulid),
/* harmony export */   undefined: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.undefined),
/* harmony export */   union: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.union),
/* harmony export */   unknown: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.unknown),
/* harmony export */   uppercase: () => (/* reexport safe */ _checks_js__WEBPACK_IMPORTED_MODULE_2__.uppercase),
/* harmony export */   url: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.url),
/* harmony export */   util: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.util),
/* harmony export */   uuid: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.uuid),
/* harmony export */   uuidv4: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.uuidv4),
/* harmony export */   uuidv6: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.uuidv6),
/* harmony export */   uuidv7: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.uuidv7),
/* harmony export */   "void": () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__["void"]),
/* harmony export */   xid: () => (/* reexport safe */ _schemas_js__WEBPACK_IMPORTED_MODULE_1__.xid)
/* harmony export */ });
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3259);
/* harmony import */ var _schemas_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2308);
/* harmony import */ var _checks_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9067);
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6081);
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7376);
/* harmony import */ var _compat_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7300);
/* harmony import */ var _locales_en_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1564);
/* harmony import */ var _locales_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9719);
/* harmony import */ var _iso_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5257);
/* harmony import */ var _coerce_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3855);






// zod-specified


(0,_core_index_js__WEBPACK_IMPORTED_MODULE_0__.config)((0,_locales_en_js__WEBPACK_IMPORTED_MODULE_6__["default"])());


// iso
// must be exported from top-level
// https://github.com/colinhacks/zod/issues/4491





/***/ }),

/***/ 8308:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _decode: () => (/* binding */ _decode),
/* harmony export */   _decodeAsync: () => (/* binding */ _decodeAsync),
/* harmony export */   _encode: () => (/* binding */ _encode),
/* harmony export */   _encodeAsync: () => (/* binding */ _encodeAsync),
/* harmony export */   _parse: () => (/* binding */ _parse),
/* harmony export */   _parseAsync: () => (/* binding */ _parseAsync),
/* harmony export */   _safeDecode: () => (/* binding */ _safeDecode),
/* harmony export */   _safeDecodeAsync: () => (/* binding */ _safeDecodeAsync),
/* harmony export */   _safeEncode: () => (/* binding */ _safeEncode),
/* harmony export */   _safeEncodeAsync: () => (/* binding */ _safeEncodeAsync),
/* harmony export */   _safeParse: () => (/* binding */ _safeParse),
/* harmony export */   _safeParseAsync: () => (/* binding */ _safeParseAsync),
/* harmony export */   decode: () => (/* binding */ decode),
/* harmony export */   decodeAsync: () => (/* binding */ decodeAsync),
/* harmony export */   encode: () => (/* binding */ encode),
/* harmony export */   encodeAsync: () => (/* binding */ encodeAsync),
/* harmony export */   parse: () => (/* binding */ parse),
/* harmony export */   parseAsync: () => (/* binding */ parseAsync),
/* harmony export */   safeDecode: () => (/* binding */ safeDecode),
/* harmony export */   safeDecodeAsync: () => (/* binding */ safeDecodeAsync),
/* harmony export */   safeEncode: () => (/* binding */ safeEncode),
/* harmony export */   safeEncodeAsync: () => (/* binding */ safeEncodeAsync),
/* harmony export */   safeParse: () => (/* binding */ safeParse),
/* harmony export */   safeParseAsync: () => (/* binding */ safeParseAsync)
/* harmony export */ });
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7476);
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2404);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4995);



const _parse = (_Err) => (schema, value, _ctx, _params) => {
    const ctx = _ctx ? Object.assign(_ctx, { async: false }) : { async: false };
    const result = schema._zod.run({ value, issues: [] }, ctx);
    if (result instanceof Promise) {
        throw new _core_js__WEBPACK_IMPORTED_MODULE_0__.$ZodAsyncError();
    }
    if (result.issues.length) {
        const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_2__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_0__.config())));
        _util_js__WEBPACK_IMPORTED_MODULE_2__.captureStackTrace(e, _params?.callee);
        throw e;
    }
    return result.value;
};
const parse = /* @__PURE__*/ _parse(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
const _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
    const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
    let result = schema._zod.run({ value, issues: [] }, ctx);
    if (result instanceof Promise)
        result = await result;
    if (result.issues.length) {
        const e = new (params?.Err ?? _Err)(result.issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_2__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_0__.config())));
        _util_js__WEBPACK_IMPORTED_MODULE_2__.captureStackTrace(e, params?.callee);
        throw e;
    }
    return result.value;
};
const parseAsync = /* @__PURE__*/ _parseAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
const _safeParse = (_Err) => (schema, value, _ctx) => {
    const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
    const result = schema._zod.run({ value, issues: [] }, ctx);
    if (result instanceof Promise) {
        throw new _core_js__WEBPACK_IMPORTED_MODULE_0__.$ZodAsyncError();
    }
    return result.issues.length
        ? {
            success: false,
            error: new (_Err ?? _errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodError)(result.issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_2__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_0__.config()))),
        }
        : { success: true, data: result.value };
};
const safeParse = /* @__PURE__*/ _safeParse(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
const _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
    const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
    let result = schema._zod.run({ value, issues: [] }, ctx);
    if (result instanceof Promise)
        result = await result;
    return result.issues.length
        ? {
            success: false,
            error: new _Err(result.issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_2__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_0__.config()))),
        }
        : { success: true, data: result.value };
};
const safeParseAsync = /* @__PURE__*/ _safeParseAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
const _encode = (_Err) => (schema, value, _ctx) => {
    const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
    return _parse(_Err)(schema, value, ctx);
};
const encode = /* @__PURE__*/ _encode(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
const _decode = (_Err) => (schema, value, _ctx) => {
    return _parse(_Err)(schema, value, _ctx);
};
const decode = /* @__PURE__*/ _decode(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
const _encodeAsync = (_Err) => async (schema, value, _ctx) => {
    const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
    return _parseAsync(_Err)(schema, value, ctx);
};
const encodeAsync = /* @__PURE__*/ _encodeAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
const _decodeAsync = (_Err) => async (schema, value, _ctx) => {
    return _parseAsync(_Err)(schema, value, _ctx);
};
const decodeAsync = /* @__PURE__*/ _decodeAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
const _safeEncode = (_Err) => (schema, value, _ctx) => {
    const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
    return _safeParse(_Err)(schema, value, ctx);
};
const safeEncode = /* @__PURE__*/ _safeEncode(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
const _safeDecode = (_Err) => (schema, value, _ctx) => {
    return _safeParse(_Err)(schema, value, _ctx);
};
const safeDecode = /* @__PURE__*/ _safeDecode(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
const _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
    const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
    return _safeParseAsync(_Err)(schema, value, ctx);
};
const safeEncodeAsync = /* @__PURE__*/ _safeEncodeAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
const _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
    return _safeParseAsync(_Err)(schema, value, _ctx);
};
const safeDecodeAsync = /* @__PURE__*/ _safeDecodeAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);


/***/ }),

/***/ 8821:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JSONSchemaGenerator: () => (/* binding */ JSONSchemaGenerator),
/* harmony export */   toJSONSchema: () => (/* binding */ toJSONSchema)
/* harmony export */ });
/* harmony import */ var _registries_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1732);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4995);


class JSONSchemaGenerator {
    constructor(params) {
        this.counter = 0;
        this.metadataRegistry = params?.metadata ?? _registries_js__WEBPACK_IMPORTED_MODULE_0__.globalRegistry;
        this.target = params?.target ?? "draft-2020-12";
        this.unrepresentable = params?.unrepresentable ?? "throw";
        this.override = params?.override ?? (() => { });
        this.io = params?.io ?? "output";
        this.seen = new Map();
    }
    process(schema, _params = { path: [], schemaPath: [] }) {
        var _a;
        const def = schema._zod.def;
        const formatMap = {
            guid: "uuid",
            url: "uri",
            datetime: "date-time",
            json_string: "json-string",
            regex: "", // do not set
        };
        // check for schema in seens
        const seen = this.seen.get(schema);
        if (seen) {
            seen.count++;
            // check if cycle
            const isCycle = _params.schemaPath.includes(schema);
            if (isCycle) {
                seen.cycle = _params.path;
            }
            return seen.schema;
        }
        // initialize
        const result = { schema: {}, count: 1, cycle: undefined, path: _params.path };
        this.seen.set(schema, result);
        // custom method overrides default behavior
        const overrideSchema = schema._zod.toJSONSchema?.();
        if (overrideSchema) {
            result.schema = overrideSchema;
        }
        else {
            const params = {
                ..._params,
                schemaPath: [..._params.schemaPath, schema],
                path: _params.path,
            };
            const parent = schema._zod.parent;
            if (parent) {
                // schema was cloned from another schema
                result.ref = parent;
                this.process(parent, params);
                this.seen.get(parent).isParent = true;
            }
            else {
                const _json = result.schema;
                switch (def.type) {
                    case "string": {
                        const json = _json;
                        json.type = "string";
                        const { minimum, maximum, format, patterns, contentEncoding } = schema._zod
                            .bag;
                        if (typeof minimum === "number")
                            json.minLength = minimum;
                        if (typeof maximum === "number")
                            json.maxLength = maximum;
                        // custom pattern overrides format
                        if (format) {
                            json.format = formatMap[format] ?? format;
                            if (json.format === "")
                                delete json.format; // empty format is not valid
                        }
                        if (contentEncoding)
                            json.contentEncoding = contentEncoding;
                        if (patterns && patterns.size > 0) {
                            const regexes = [...patterns];
                            if (regexes.length === 1)
                                json.pattern = regexes[0].source;
                            else if (regexes.length > 1) {
                                result.schema.allOf = [
                                    ...regexes.map((regex) => ({
                                        ...(this.target === "draft-7" || this.target === "draft-4" || this.target === "openapi-3.0"
                                            ? { type: "string" }
                                            : {}),
                                        pattern: regex.source,
                                    })),
                                ];
                            }
                        }
                        break;
                    }
                    case "number": {
                        const json = _json;
                        const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
                        if (typeof format === "string" && format.includes("int"))
                            json.type = "integer";
                        else
                            json.type = "number";
                        if (typeof exclusiveMinimum === "number") {
                            if (this.target === "draft-4" || this.target === "openapi-3.0") {
                                json.minimum = exclusiveMinimum;
                                json.exclusiveMinimum = true;
                            }
                            else {
                                json.exclusiveMinimum = exclusiveMinimum;
                            }
                        }
                        if (typeof minimum === "number") {
                            json.minimum = minimum;
                            if (typeof exclusiveMinimum === "number" && this.target !== "draft-4") {
                                if (exclusiveMinimum >= minimum)
                                    delete json.minimum;
                                else
                                    delete json.exclusiveMinimum;
                            }
                        }
                        if (typeof exclusiveMaximum === "number") {
                            if (this.target === "draft-4" || this.target === "openapi-3.0") {
                                json.maximum = exclusiveMaximum;
                                json.exclusiveMaximum = true;
                            }
                            else {
                                json.exclusiveMaximum = exclusiveMaximum;
                            }
                        }
                        if (typeof maximum === "number") {
                            json.maximum = maximum;
                            if (typeof exclusiveMaximum === "number" && this.target !== "draft-4") {
                                if (exclusiveMaximum <= maximum)
                                    delete json.maximum;
                                else
                                    delete json.exclusiveMaximum;
                            }
                        }
                        if (typeof multipleOf === "number")
                            json.multipleOf = multipleOf;
                        break;
                    }
                    case "boolean": {
                        const json = _json;
                        json.type = "boolean";
                        break;
                    }
                    case "bigint": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("BigInt cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "symbol": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Symbols cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "null": {
                        _json.type = "null";
                        break;
                    }
                    case "any": {
                        break;
                    }
                    case "unknown": {
                        break;
                    }
                    case "undefined": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Undefined cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "void": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Void cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "never": {
                        _json.not = {};
                        break;
                    }
                    case "date": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Date cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "array": {
                        const json = _json;
                        const { minimum, maximum } = schema._zod.bag;
                        if (typeof minimum === "number")
                            json.minItems = minimum;
                        if (typeof maximum === "number")
                            json.maxItems = maximum;
                        json.type = "array";
                        json.items = this.process(def.element, { ...params, path: [...params.path, "items"] });
                        break;
                    }
                    case "object": {
                        const json = _json;
                        json.type = "object";
                        json.properties = {};
                        const shape = def.shape; // params.shapeCache.get(schema)!;
                        for (const key in shape) {
                            json.properties[key] = this.process(shape[key], {
                                ...params,
                                path: [...params.path, "properties", key],
                            });
                        }
                        // required keys
                        const allKeys = new Set(Object.keys(shape));
                        // const optionalKeys = new Set(def.optional);
                        const requiredKeys = new Set([...allKeys].filter((key) => {
                            const v = def.shape[key]._zod;
                            if (this.io === "input") {
                                return v.optin === undefined;
                            }
                            else {
                                return v.optout === undefined;
                            }
                        }));
                        if (requiredKeys.size > 0) {
                            json.required = Array.from(requiredKeys);
                        }
                        // catchall
                        if (def.catchall?._zod.def.type === "never") {
                            // strict
                            json.additionalProperties = false;
                        }
                        else if (!def.catchall) {
                            // regular
                            if (this.io === "output")
                                json.additionalProperties = false;
                        }
                        else if (def.catchall) {
                            json.additionalProperties = this.process(def.catchall, {
                                ...params,
                                path: [...params.path, "additionalProperties"],
                            });
                        }
                        break;
                    }
                    case "union": {
                        const json = _json;
                        const options = def.options.map((x, i) => this.process(x, {
                            ...params,
                            path: [...params.path, "anyOf", i],
                        }));
                        if (this.target === "openapi-3.0") {
                            const nonNull = options.filter((x) => x.type !== "null");
                            const hasNull = nonNull.length !== options.length;
                            if (nonNull.length === 1) {
                                Object.assign(json, nonNull[0]);
                            }
                            else {
                                json.anyOf = nonNull;
                            }
                            if (hasNull)
                                json.nullable = true;
                        }
                        else {
                            json.anyOf = options;
                        }
                        break;
                    }
                    case "intersection": {
                        const json = _json;
                        const a = this.process(def.left, {
                            ...params,
                            path: [...params.path, "allOf", 0],
                        });
                        const b = this.process(def.right, {
                            ...params,
                            path: [...params.path, "allOf", 1],
                        });
                        const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
                        const allOf = [
                            ...(isSimpleIntersection(a) ? a.allOf : [a]),
                            ...(isSimpleIntersection(b) ? b.allOf : [b]),
                        ];
                        json.allOf = allOf;
                        break;
                    }
                    case "tuple": {
                        const json = _json;
                        json.type = "array";
                        const prefixPath = this.target === "draft-2020-12" ? "prefixItems" : "items";
                        const restPath = this.target === "draft-2020-12" ? "items" : this.target === "openapi-3.0" ? "items" : "additionalItems";
                        const prefixItems = def.items.map((x, i) => this.process(x, {
                            ...params,
                            path: [...params.path, prefixPath, i],
                        }));
                        const rest = def.rest
                            ? this.process(def.rest, {
                                ...params,
                                path: [...params.path, restPath, ...(this.target === "openapi-3.0" ? [def.items.length] : [])],
                            })
                            : null;
                        if (this.target === "draft-2020-12") {
                            json.prefixItems = prefixItems;
                            if (rest) {
                                json.items = rest;
                            }
                        }
                        else if (this.target === "openapi-3.0") {
                            json.items = {
                                anyOf: [...prefixItems],
                            };
                            if (rest) {
                                json.items.anyOf.push(rest);
                            }
                            json.minItems = prefixItems.length;
                            if (!rest) {
                                json.maxItems = prefixItems.length;
                            }
                        }
                        else {
                            json.items = prefixItems;
                            if (rest) {
                                json.additionalItems = rest;
                            }
                        }
                        // length
                        const { minimum, maximum } = schema._zod.bag;
                        if (typeof minimum === "number")
                            json.minItems = minimum;
                        if (typeof maximum === "number")
                            json.maxItems = maximum;
                        break;
                    }
                    case "record": {
                        const json = _json;
                        json.type = "object";
                        if (this.target === "draft-7" || this.target === "draft-2020-12") {
                            json.propertyNames = this.process(def.keyType, {
                                ...params,
                                path: [...params.path, "propertyNames"],
                            });
                        }
                        json.additionalProperties = this.process(def.valueType, {
                            ...params,
                            path: [...params.path, "additionalProperties"],
                        });
                        break;
                    }
                    case "map": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Map cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "set": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Set cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "enum": {
                        const json = _json;
                        const values = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getEnumValues)(def.entries);
                        // Number enums can have both string and number values
                        if (values.every((v) => typeof v === "number"))
                            json.type = "number";
                        if (values.every((v) => typeof v === "string"))
                            json.type = "string";
                        json.enum = values;
                        break;
                    }
                    case "literal": {
                        const json = _json;
                        const vals = [];
                        for (const val of def.values) {
                            if (val === undefined) {
                                if (this.unrepresentable === "throw") {
                                    throw new Error("Literal `undefined` cannot be represented in JSON Schema");
                                }
                                else {
                                    // do not add to vals
                                }
                            }
                            else if (typeof val === "bigint") {
                                if (this.unrepresentable === "throw") {
                                    throw new Error("BigInt literals cannot be represented in JSON Schema");
                                }
                                else {
                                    vals.push(Number(val));
                                }
                            }
                            else {
                                vals.push(val);
                            }
                        }
                        if (vals.length === 0) {
                            // do nothing (an undefined literal was stripped)
                        }
                        else if (vals.length === 1) {
                            const val = vals[0];
                            json.type = val === null ? "null" : typeof val;
                            if (this.target === "draft-4" || this.target === "openapi-3.0") {
                                json.enum = [val];
                            }
                            else {
                                json.const = val;
                            }
                        }
                        else {
                            if (vals.every((v) => typeof v === "number"))
                                json.type = "number";
                            if (vals.every((v) => typeof v === "string"))
                                json.type = "string";
                            if (vals.every((v) => typeof v === "boolean"))
                                json.type = "string";
                            if (vals.every((v) => v === null))
                                json.type = "null";
                            json.enum = vals;
                        }
                        break;
                    }
                    case "file": {
                        const json = _json;
                        const file = {
                            type: "string",
                            format: "binary",
                            contentEncoding: "binary",
                        };
                        const { minimum, maximum, mime } = schema._zod.bag;
                        if (minimum !== undefined)
                            file.minLength = minimum;
                        if (maximum !== undefined)
                            file.maxLength = maximum;
                        if (mime) {
                            if (mime.length === 1) {
                                file.contentMediaType = mime[0];
                                Object.assign(json, file);
                            }
                            else {
                                json.anyOf = mime.map((m) => {
                                    const mFile = { ...file, contentMediaType: m };
                                    return mFile;
                                });
                            }
                        }
                        else {
                            Object.assign(json, file);
                        }
                        // if (this.unrepresentable === "throw") {
                        //   throw new Error("File cannot be represented in JSON Schema");
                        // }
                        break;
                    }
                    case "transform": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Transforms cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "nullable": {
                        const inner = this.process(def.innerType, params);
                        if (this.target === "openapi-3.0") {
                            Object.assign(_json, inner);
                            _json.nullable = true;
                            result.ref = def.innerType;
                        }
                        else {
                            _json.anyOf = [inner, { type: "null" }];
                        }
                        break;
                    }
                    case "nonoptional": {
                        this.process(def.innerType, params);
                        result.ref = def.innerType;
                        break;
                    }
                    case "success": {
                        const json = _json;
                        json.type = "boolean";
                        break;
                    }
                    case "default": {
                        this.process(def.innerType, params);
                        result.ref = def.innerType;
                        _json.default = JSON.parse(JSON.stringify(def.defaultValue));
                        break;
                    }
                    case "prefault": {
                        this.process(def.innerType, params);
                        result.ref = def.innerType;
                        if (this.io === "input")
                            _json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
                        break;
                    }
                    case "catch": {
                        // use conditionals
                        this.process(def.innerType, params);
                        result.ref = def.innerType;
                        let catchValue;
                        try {
                            catchValue = def.catchValue(undefined);
                        }
                        catch {
                            throw new Error("Dynamic catch values are not supported in JSON Schema");
                        }
                        _json.default = catchValue;
                        break;
                    }
                    case "nan": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("NaN cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "template_literal": {
                        const json = _json;
                        const pattern = schema._zod.pattern;
                        if (!pattern)
                            throw new Error("Pattern not found in template literal");
                        json.type = "string";
                        json.pattern = pattern.source;
                        break;
                    }
                    case "pipe": {
                        const innerType = this.io === "input" ? (def.in._zod.def.type === "transform" ? def.out : def.in) : def.out;
                        this.process(innerType, params);
                        result.ref = innerType;
                        break;
                    }
                    case "readonly": {
                        this.process(def.innerType, params);
                        result.ref = def.innerType;
                        _json.readOnly = true;
                        break;
                    }
                    // passthrough types
                    case "promise": {
                        this.process(def.innerType, params);
                        result.ref = def.innerType;
                        break;
                    }
                    case "optional": {
                        this.process(def.innerType, params);
                        result.ref = def.innerType;
                        break;
                    }
                    case "lazy": {
                        const innerType = schema._zod.innerType;
                        this.process(innerType, params);
                        result.ref = innerType;
                        break;
                    }
                    case "custom": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Custom types cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "function": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Function types cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    default: {
                        def;
                    }
                }
            }
        }
        // metadata
        const meta = this.metadataRegistry.get(schema);
        if (meta)
            Object.assign(result.schema, meta);
        if (this.io === "input" && isTransforming(schema)) {
            // examples/defaults only apply to output type of pipe
            delete result.schema.examples;
            delete result.schema.default;
        }
        // set prefault as default
        if (this.io === "input" && result.schema._prefault)
            (_a = result.schema).default ?? (_a.default = result.schema._prefault);
        delete result.schema._prefault;
        // pulling fresh from this.seen in case it was overwritten
        const _result = this.seen.get(schema);
        return _result.schema;
    }
    emit(schema, _params) {
        const params = {
            cycles: _params?.cycles ?? "ref",
            reused: _params?.reused ?? "inline",
            // unrepresentable: _params?.unrepresentable ?? "throw",
            // uri: _params?.uri ?? ((id) => `${id}`),
            external: _params?.external ?? undefined,
        };
        // iterate over seen map;
        const root = this.seen.get(schema);
        if (!root)
            throw new Error("Unprocessed schema. This is a bug in Zod.");
        // initialize result with root schema fields
        // Object.assign(result, seen.cached);
        // returns a ref to the schema
        // defId will be empty if the ref points to an external schema (or #)
        const makeURI = (entry) => {
            // comparing the seen objects because sometimes
            // multiple schemas map to the same seen object.
            // e.g. lazy
            // external is configured
            const defsSegment = this.target === "draft-2020-12" ? "$defs" : "definitions";
            if (params.external) {
                const externalId = params.external.registry.get(entry[0])?.id; // ?? "__shared";// `__schema${this.counter++}`;
                // check if schema is in the external registry
                const uriGenerator = params.external.uri ?? ((id) => id);
                if (externalId) {
                    return { ref: uriGenerator(externalId) };
                }
                // otherwise, add to __shared
                const id = entry[1].defId ?? entry[1].schema.id ?? `schema${this.counter++}`;
                entry[1].defId = id; // set defId so it will be reused if needed
                return { defId: id, ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}` };
            }
            if (entry[1] === root) {
                return { ref: "#" };
            }
            // self-contained schema
            const uriPrefix = `#`;
            const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
            const defId = entry[1].schema.id ?? `__schema${this.counter++}`;
            return { defId, ref: defUriPrefix + defId };
        };
        // stored cached version in `def` property
        // remove all properties, set $ref
        const extractToDef = (entry) => {
            // if the schema is already a reference, do not extract it
            if (entry[1].schema.$ref) {
                return;
            }
            const seen = entry[1];
            const { ref, defId } = makeURI(entry);
            seen.def = { ...seen.schema };
            // defId won't be set if the schema is a reference to an external schema
            if (defId)
                seen.defId = defId;
            // wipe away all properties except $ref
            const schema = seen.schema;
            for (const key in schema) {
                delete schema[key];
            }
            schema.$ref = ref;
        };
        // throw on cycles
        // break cycles
        if (params.cycles === "throw") {
            for (const entry of this.seen.entries()) {
                const seen = entry[1];
                if (seen.cycle) {
                    throw new Error("Cycle detected: " +
                        `#/${seen.cycle?.join("/")}/<root>` +
                        '\n\nSet the `cycles` parameter to `"ref"` to resolve cyclical schemas with defs.');
                }
            }
        }
        // extract schemas into $defs
        for (const entry of this.seen.entries()) {
            const seen = entry[1];
            // convert root schema to # $ref
            if (schema === entry[0]) {
                extractToDef(entry); // this has special handling for the root schema
                continue;
            }
            // extract schemas that are in the external registry
            if (params.external) {
                const ext = params.external.registry.get(entry[0])?.id;
                if (schema !== entry[0] && ext) {
                    extractToDef(entry);
                    continue;
                }
            }
            // extract schemas with `id` meta
            const id = this.metadataRegistry.get(entry[0])?.id;
            if (id) {
                extractToDef(entry);
                continue;
            }
            // break cycles
            if (seen.cycle) {
                // any
                extractToDef(entry);
                continue;
            }
            // extract reused schemas
            if (seen.count > 1) {
                if (params.reused === "ref") {
                    extractToDef(entry);
                    // biome-ignore lint:
                    continue;
                }
            }
        }
        // flatten _refs
        const flattenRef = (zodSchema, params) => {
            const seen = this.seen.get(zodSchema);
            const schema = seen.def ?? seen.schema;
            const _cached = { ...schema };
            // already seen
            if (seen.ref === null) {
                return;
            }
            // flatten ref if defined
            const ref = seen.ref;
            seen.ref = null; // prevent recursion
            if (ref) {
                flattenRef(ref, params);
                // merge referenced schema into current
                const refSchema = this.seen.get(ref).schema;
                if (refSchema.$ref &&
                    (params.target === "draft-7" || params.target === "draft-4" || params.target === "openapi-3.0")) {
                    schema.allOf = schema.allOf ?? [];
                    schema.allOf.push(refSchema);
                }
                else {
                    Object.assign(schema, refSchema);
                    Object.assign(schema, _cached); // prevent overwriting any fields in the original schema
                }
            }
            // execute overrides
            if (!seen.isParent)
                this.override({
                    zodSchema: zodSchema,
                    jsonSchema: schema,
                    path: seen.path ?? [],
                });
        };
        for (const entry of [...this.seen.entries()].reverse()) {
            flattenRef(entry[0], { target: this.target });
        }
        const result = {};
        if (this.target === "draft-2020-12") {
            result.$schema = "https://json-schema.org/draft/2020-12/schema";
        }
        else if (this.target === "draft-7") {
            result.$schema = "http://json-schema.org/draft-07/schema#";
        }
        else if (this.target === "draft-4") {
            result.$schema = "http://json-schema.org/draft-04/schema#";
        }
        else if (this.target === "openapi-3.0") {
            // OpenAPI 3.0 schema objects should not include a $schema property
        }
        else {
            // @ts-ignore
            console.warn(`Invalid target: ${this.target}`);
        }
        if (params.external?.uri) {
            const id = params.external.registry.get(schema)?.id;
            if (!id)
                throw new Error("Schema is missing an `id` property");
            result.$id = params.external.uri(id);
        }
        Object.assign(result, root.def);
        // build defs object
        const defs = params.external?.defs ?? {};
        for (const entry of this.seen.entries()) {
            const seen = entry[1];
            if (seen.def && seen.defId) {
                defs[seen.defId] = seen.def;
            }
        }
        // set definitions in result
        if (params.external) {
        }
        else {
            if (Object.keys(defs).length > 0) {
                if (this.target === "draft-2020-12") {
                    result.$defs = defs;
                }
                else {
                    result.definitions = defs;
                }
            }
        }
        try {
            // this "finalizes" this schema and ensures all cycles are removed
            // each call to .emit() is functionally independent
            // though the seen map is shared
            return JSON.parse(JSON.stringify(result));
        }
        catch (_err) {
            throw new Error("Error converting schema to JSON.");
        }
    }
}
function toJSONSchema(input, _params) {
    if (input instanceof _registries_js__WEBPACK_IMPORTED_MODULE_0__.$ZodRegistry) {
        const gen = new JSONSchemaGenerator(_params);
        const defs = {};
        for (const entry of input._idmap.entries()) {
            const [_, schema] = entry;
            gen.process(schema);
        }
        const schemas = {};
        const external = {
            registry: input,
            uri: _params?.uri,
            defs,
        };
        for (const entry of input._idmap.entries()) {
            const [key, schema] = entry;
            schemas[key] = gen.emit(schema, {
                ..._params,
                external,
            });
        }
        if (Object.keys(defs).length > 0) {
            const defsSegment = gen.target === "draft-2020-12" ? "$defs" : "definitions";
            schemas.__shared = {
                [defsSegment]: defs,
            };
        }
        return { schemas };
    }
    const gen = new JSONSchemaGenerator(_params);
    gen.process(input);
    return gen.emit(input, _params);
}
function isTransforming(_schema, _ctx) {
    const ctx = _ctx ?? { seen: new Set() };
    if (ctx.seen.has(_schema))
        return false;
    ctx.seen.add(_schema);
    const schema = _schema;
    const def = schema._zod.def;
    switch (def.type) {
        case "string":
        case "number":
        case "bigint":
        case "boolean":
        case "date":
        case "symbol":
        case "undefined":
        case "null":
        case "any":
        case "unknown":
        case "never":
        case "void":
        case "literal":
        case "enum":
        case "nan":
        case "file":
        case "template_literal":
            return false;
        case "array": {
            return isTransforming(def.element, ctx);
        }
        case "object": {
            for (const key in def.shape) {
                if (isTransforming(def.shape[key], ctx))
                    return true;
            }
            return false;
        }
        case "union": {
            for (const option of def.options) {
                if (isTransforming(option, ctx))
                    return true;
            }
            return false;
        }
        case "intersection": {
            return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
        }
        case "tuple": {
            for (const item of def.items) {
                if (isTransforming(item, ctx))
                    return true;
            }
            if (def.rest && isTransforming(def.rest, ctx))
                return true;
            return false;
        }
        case "record": {
            return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
        }
        case "map": {
            return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
        }
        case "set": {
            return isTransforming(def.valueType, ctx);
        }
        // inner types
        case "promise":
        case "optional":
        case "nonoptional":
        case "nullable":
        case "readonly":
            return isTransforming(def.innerType, ctx);
        case "lazy":
            return isTransforming(def.getter(), ctx);
        case "default": {
            return isTransforming(def.innerType, ctx);
        }
        case "prefault": {
            return isTransforming(def.innerType, ctx);
        }
        case "custom": {
            return false;
        }
        case "transform": {
            return true;
        }
        case "pipe": {
            return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
        }
        case "success": {
            return false;
        }
        case "catch": {
            return false;
        }
        case "function": {
            return false;
        }
        default:
            def;
    }
    throw new Error(`Unknown schema type: ${def.type}`);
}


/***/ }),

/***/ 9067:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   endsWith: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._endsWith),
/* harmony export */   gt: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._gt),
/* harmony export */   gte: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._gte),
/* harmony export */   includes: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._includes),
/* harmony export */   length: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._length),
/* harmony export */   lowercase: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._lowercase),
/* harmony export */   lt: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._lt),
/* harmony export */   lte: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._lte),
/* harmony export */   maxLength: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._maxLength),
/* harmony export */   maxSize: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._maxSize),
/* harmony export */   mime: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._mime),
/* harmony export */   minLength: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._minLength),
/* harmony export */   minSize: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._minSize),
/* harmony export */   multipleOf: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._multipleOf),
/* harmony export */   negative: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._negative),
/* harmony export */   nonnegative: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._nonnegative),
/* harmony export */   nonpositive: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._nonpositive),
/* harmony export */   normalize: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._normalize),
/* harmony export */   overwrite: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._overwrite),
/* harmony export */   positive: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._positive),
/* harmony export */   property: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._property),
/* harmony export */   regex: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._regex),
/* harmony export */   size: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._size),
/* harmony export */   startsWith: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._startsWith),
/* harmony export */   toLowerCase: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._toLowerCase),
/* harmony export */   toUpperCase: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._toUpperCase),
/* harmony export */   trim: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._trim),
/* harmony export */   uppercase: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._uppercase)
/* harmony export */ });
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3259);



/***/ }),

/***/ 9240:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "אותיות", verb: "לכלול" },
        file: { unit: "בייטים", verb: "לכלול" },
        array: { unit: "פריטים", verb: "לכלול" },
        set: { unit: "פריטים", verb: "לכלול" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "number";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "array";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "קלט",
        email: "כתובת אימייל",
        url: "כתובת רשת",
        emoji: "אימוג'י",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "תאריך וזמן ISO",
        date: "תאריך ISO",
        time: "זמן ISO",
        duration: "משך זמן ISO",
        ipv4: "כתובת IPv4",
        ipv6: "כתובת IPv6",
        cidrv4: "טווח IPv4",
        cidrv6: "טווח IPv6",
        base64: "מחרוזת בבסיס 64",
        base64url: "מחרוזת בבסיס 64 לכתובות רשת",
        json_string: "מחרוזת JSON",
        e164: "מספר E.164",
        jwt: "JWT",
        template_literal: "קלט",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `קלט לא תקין: צריך ${issue.expected}, התקבל ${parsedType(issue.input)}`;
            // return `Invalid input: expected ${issue.expected}, received ${util.getParsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `קלט לא תקין: צריך ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `קלט לא תקין: צריך אחת מהאפשרויות  ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `גדול מדי: ${issue.origin ?? "value"} צריך להיות ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
                return `גדול מדי: ${issue.origin ?? "value"} צריך להיות ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `קטן מדי: ${issue.origin} צריך להיות ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `קטן מדי: ${issue.origin} צריך להיות ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `מחרוזת לא תקינה: חייבת להתחיל ב"${_issue.prefix}"`;
                if (_issue.format === "ends_with")
                    return `מחרוזת לא תקינה: חייבת להסתיים ב "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `מחרוזת לא תקינה: חייבת לכלול "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `מחרוזת לא תקינה: חייבת להתאים לתבנית ${_issue.pattern}`;
                return `${Nouns[_issue.format] ?? issue.format} לא תקין`;
            }
            case "not_multiple_of":
                return `מספר לא תקין: חייב להיות מכפלה של ${issue.divisor}`;
            case "unrecognized_keys":
                return `מפתח${issue.keys.length > 1 ? "ות" : ""} לא מזוה${issue.keys.length > 1 ? "ים" : "ה"}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `מפתח לא תקין ב${issue.origin}`;
            case "invalid_union":
                return "קלט לא תקין";
            case "invalid_element":
                return `ערך לא תקין ב${issue.origin}`;
            default:
                return `קלט לא תקין`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 9438:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "ký tự", verb: "có" },
        file: { unit: "byte", verb: "có" },
        array: { unit: "phần tử", verb: "có" },
        set: { unit: "phần tử", verb: "có" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "số";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "mảng";
                }
                if (data === null) {
                    return "null";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "đầu vào",
        email: "địa chỉ email",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ngày giờ ISO",
        date: "ngày ISO",
        time: "giờ ISO",
        duration: "khoảng thời gian ISO",
        ipv4: "địa chỉ IPv4",
        ipv6: "địa chỉ IPv6",
        cidrv4: "dải IPv4",
        cidrv6: "dải IPv6",
        base64: "chuỗi mã hóa base64",
        base64url: "chuỗi mã hóa base64url",
        json_string: "chuỗi JSON",
        e164: "số E.164",
        jwt: "JWT",
        template_literal: "đầu vào",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Đầu vào không hợp lệ: mong đợi ${issue.expected}, nhận được ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Đầu vào không hợp lệ: mong đợi ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Tùy chọn không hợp lệ: mong đợi một trong các giá trị ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Quá lớn: mong đợi ${issue.origin ?? "giá trị"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "phần tử"}`;
                return `Quá lớn: mong đợi ${issue.origin ?? "giá trị"} ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Quá nhỏ: mong đợi ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `Quá nhỏ: mong đợi ${issue.origin} ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `Chuỗi không hợp lệ: phải bắt đầu bằng "${_issue.prefix}"`;
                if (_issue.format === "ends_with")
                    return `Chuỗi không hợp lệ: phải kết thúc bằng "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Chuỗi không hợp lệ: phải bao gồm "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Chuỗi không hợp lệ: phải khớp với mẫu ${_issue.pattern}`;
                return `${Nouns[_issue.format] ?? issue.format} không hợp lệ`;
            }
            case "not_multiple_of":
                return `Số không hợp lệ: phải là bội số của ${issue.divisor}`;
            case "unrecognized_keys":
                return `Khóa không được nhận dạng: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Khóa không hợp lệ trong ${issue.origin}`;
            case "invalid_union":
                return "Đầu vào không hợp lệ";
            case "invalid_element":
                return `Giá trị không hợp lệ trong ${issue.origin}`;
            default:
                return `Đầu vào không hợp lệ`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 9667:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   parsedType: () => (/* binding */ parsedType)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const parsedType = (data) => {
    const t = typeof data;
    switch (t) {
        case "number": {
            return Number.isNaN(data) ? "NaN" : "nombro";
        }
        case "object": {
            if (Array.isArray(data)) {
                return "tabelo";
            }
            if (data === null) {
                return "senvalora";
            }
            if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                return data.constructor.name;
            }
        }
    }
    return t;
};
const error = () => {
    const Sizable = {
        string: { unit: "karaktrojn", verb: "havi" },
        file: { unit: "bajtojn", verb: "havi" },
        array: { unit: "elementojn", verb: "havi" },
        set: { unit: "elementojn", verb: "havi" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const Nouns = {
        regex: "enigo",
        email: "retadreso",
        url: "URL",
        emoji: "emoĝio",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO-datotempo",
        date: "ISO-dato",
        time: "ISO-tempo",
        duration: "ISO-daŭro",
        ipv4: "IPv4-adreso",
        ipv6: "IPv6-adreso",
        cidrv4: "IPv4-rango",
        cidrv6: "IPv6-rango",
        base64: "64-ume kodita karaktraro",
        base64url: "URL-64-ume kodita karaktraro",
        json_string: "JSON-karaktraro",
        e164: "E.164-nombro",
        jwt: "JWT",
        template_literal: "enigo",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Nevalida enigo: atendiĝis ${issue.expected}, riceviĝis ${parsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Nevalida enigo: atendiĝis ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Nevalida opcio: atendiĝis unu el ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Tro granda: atendiĝis ke ${issue.origin ?? "valoro"} havu ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementojn"}`;
                return `Tro granda: atendiĝis ke ${issue.origin ?? "valoro"} havu ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Tro malgranda: atendiĝis ke ${issue.origin} havu ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `Tro malgranda: atendiĝis ke ${issue.origin} estu ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `Nevalida karaktraro: devas komenciĝi per "${_issue.prefix}"`;
                if (_issue.format === "ends_with")
                    return `Nevalida karaktraro: devas finiĝi per "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Nevalida karaktraro: devas inkluzivi "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Nevalida karaktraro: devas kongrui kun la modelo ${_issue.pattern}`;
                return `Nevalida ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Nevalida nombro: devas esti oblo de ${issue.divisor}`;
            case "unrecognized_keys":
                return `Nekonata${issue.keys.length > 1 ? "j" : ""} ŝlosilo${issue.keys.length > 1 ? "j" : ""}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Nevalida ŝlosilo en ${issue.origin}`;
            case "invalid_union":
                return "Nevalida enigo";
            case "invalid_element":
                return `Nevalida valoro en ${issue.origin}`;
            default:
                return `Nevalida enigo`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 9719:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ar: () => (/* reexport safe */ _ar_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   az: () => (/* reexport safe */ _az_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   be: () => (/* reexport safe */ _be_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   ca: () => (/* reexport safe */ _ca_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   cs: () => (/* reexport safe */ _cs_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   da: () => (/* reexport safe */ _da_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   de: () => (/* reexport safe */ _de_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   en: () => (/* reexport safe */ _en_js__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   eo: () => (/* reexport safe */ _eo_js__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   es: () => (/* reexport safe */ _es_js__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   fa: () => (/* reexport safe */ _fa_js__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   fi: () => (/* reexport safe */ _fi_js__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   fr: () => (/* reexport safe */ _fr_js__WEBPACK_IMPORTED_MODULE_12__["default"]),
/* harmony export */   frCA: () => (/* reexport safe */ _fr_CA_js__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   he: () => (/* reexport safe */ _he_js__WEBPACK_IMPORTED_MODULE_14__["default"]),
/* harmony export */   hu: () => (/* reexport safe */ _hu_js__WEBPACK_IMPORTED_MODULE_15__["default"]),
/* harmony export */   id: () => (/* reexport safe */ _id_js__WEBPACK_IMPORTED_MODULE_16__["default"]),
/* harmony export */   is: () => (/* reexport safe */ _is_js__WEBPACK_IMPORTED_MODULE_17__["default"]),
/* harmony export */   it: () => (/* reexport safe */ _it_js__WEBPACK_IMPORTED_MODULE_18__["default"]),
/* harmony export */   ja: () => (/* reexport safe */ _ja_js__WEBPACK_IMPORTED_MODULE_19__["default"]),
/* harmony export */   kh: () => (/* reexport safe */ _kh_js__WEBPACK_IMPORTED_MODULE_20__["default"]),
/* harmony export */   ko: () => (/* reexport safe */ _ko_js__WEBPACK_IMPORTED_MODULE_21__["default"]),
/* harmony export */   mk: () => (/* reexport safe */ _mk_js__WEBPACK_IMPORTED_MODULE_22__["default"]),
/* harmony export */   ms: () => (/* reexport safe */ _ms_js__WEBPACK_IMPORTED_MODULE_23__["default"]),
/* harmony export */   nl: () => (/* reexport safe */ _nl_js__WEBPACK_IMPORTED_MODULE_24__["default"]),
/* harmony export */   no: () => (/* reexport safe */ _no_js__WEBPACK_IMPORTED_MODULE_25__["default"]),
/* harmony export */   ota: () => (/* reexport safe */ _ota_js__WEBPACK_IMPORTED_MODULE_26__["default"]),
/* harmony export */   pl: () => (/* reexport safe */ _pl_js__WEBPACK_IMPORTED_MODULE_28__["default"]),
/* harmony export */   ps: () => (/* reexport safe */ _ps_js__WEBPACK_IMPORTED_MODULE_27__["default"]),
/* harmony export */   pt: () => (/* reexport safe */ _pt_js__WEBPACK_IMPORTED_MODULE_29__["default"]),
/* harmony export */   ru: () => (/* reexport safe */ _ru_js__WEBPACK_IMPORTED_MODULE_30__["default"]),
/* harmony export */   sl: () => (/* reexport safe */ _sl_js__WEBPACK_IMPORTED_MODULE_31__["default"]),
/* harmony export */   sv: () => (/* reexport safe */ _sv_js__WEBPACK_IMPORTED_MODULE_32__["default"]),
/* harmony export */   ta: () => (/* reexport safe */ _ta_js__WEBPACK_IMPORTED_MODULE_33__["default"]),
/* harmony export */   th: () => (/* reexport safe */ _th_js__WEBPACK_IMPORTED_MODULE_34__["default"]),
/* harmony export */   tr: () => (/* reexport safe */ _tr_js__WEBPACK_IMPORTED_MODULE_35__["default"]),
/* harmony export */   ua: () => (/* reexport safe */ _ua_js__WEBPACK_IMPORTED_MODULE_36__["default"]),
/* harmony export */   ur: () => (/* reexport safe */ _ur_js__WEBPACK_IMPORTED_MODULE_37__["default"]),
/* harmony export */   vi: () => (/* reexport safe */ _vi_js__WEBPACK_IMPORTED_MODULE_38__["default"]),
/* harmony export */   yo: () => (/* reexport safe */ _yo_js__WEBPACK_IMPORTED_MODULE_41__["default"]),
/* harmony export */   zhCN: () => (/* reexport safe */ _zh_CN_js__WEBPACK_IMPORTED_MODULE_39__["default"]),
/* harmony export */   zhTW: () => (/* reexport safe */ _zh_TW_js__WEBPACK_IMPORTED_MODULE_40__["default"])
/* harmony export */ });
/* harmony import */ var _ar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4572);
/* harmony import */ var _az_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7348);
/* harmony import */ var _be_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4998);
/* harmony import */ var _ca_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4011);
/* harmony import */ var _cs_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1709);
/* harmony import */ var _da_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4104);
/* harmony import */ var _de_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(372);
/* harmony import */ var _en_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1564);
/* harmony import */ var _eo_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9667);
/* harmony import */ var _es_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3487);
/* harmony import */ var _fa_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1270);
/* harmony import */ var _fi_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(6350);
/* harmony import */ var _fr_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(2915);
/* harmony import */ var _fr_CA_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(4920);
/* harmony import */ var _he_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(9240);
/* harmony import */ var _hu_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(1240);
/* harmony import */ var _id_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(4370);
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(555);
/* harmony import */ var _it_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(7122);
/* harmony import */ var _ja_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(370);
/* harmony import */ var _kh_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(6404);
/* harmony import */ var _ko_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(273);
/* harmony import */ var _mk_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(5615);
/* harmony import */ var _ms_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(4311);
/* harmony import */ var _nl_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(5241);
/* harmony import */ var _no_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(4240);
/* harmony import */ var _ota_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(9741);
/* harmony import */ var _ps_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(7254);
/* harmony import */ var _pl_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(207);
/* harmony import */ var _pt_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(5783);
/* harmony import */ var _ru_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(5014);
/* harmony import */ var _sl_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(1792);
/* harmony import */ var _sv_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(450);
/* harmony import */ var _ta_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(2968);
/* harmony import */ var _th_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(3879);
/* harmony import */ var _tr_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(2001);
/* harmony import */ var _ua_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(1601);
/* harmony import */ var _ur_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(6216);
/* harmony import */ var _vi_js__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(9438);
/* harmony import */ var _zh_CN_js__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(7991);
/* harmony import */ var _zh_TW_js__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(2431);
/* harmony import */ var _yo_js__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(6055);












































/***/ }),

/***/ 9741:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4995);

const error = () => {
    const Sizable = {
        string: { unit: "harf", verb: "olmalıdır" },
        file: { unit: "bayt", verb: "olmalıdır" },
        array: { unit: "unsur", verb: "olmalıdır" },
        set: { unit: "unsur", verb: "olmalıdır" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const parsedType = (data) => {
        const t = typeof data;
        switch (t) {
            case "number": {
                return Number.isNaN(data) ? "NaN" : "numara";
            }
            case "object": {
                if (Array.isArray(data)) {
                    return "saf";
                }
                if (data === null) {
                    return "gayb";
                }
                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
                    return data.constructor.name;
                }
            }
        }
        return t;
    };
    const Nouns = {
        regex: "giren",
        email: "epostagâh",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO hengâmı",
        date: "ISO tarihi",
        time: "ISO zamanı",
        duration: "ISO müddeti",
        ipv4: "IPv4 nişânı",
        ipv6: "IPv6 nişânı",
        cidrv4: "IPv4 menzili",
        cidrv6: "IPv6 menzili",
        base64: "base64-şifreli metin",
        base64url: "base64url-şifreli metin",
        json_string: "JSON metin",
        e164: "E.164 sayısı",
        jwt: "JWT",
        template_literal: "giren",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type":
                return `Fâsit giren: umulan ${issue.expected}, alınan ${parsedType(issue.input)}`;
            // return `Fâsit giren: umulan ${issue.expected}, alınan ${util.getParsedType(issue.input)}`;
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Fâsit giren: umulan ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Fâsit tercih: mûteberler ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Fazla büyük: ${issue.origin ?? "value"}, ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"} sahip olmalıydı.`;
                return `Fazla büyük: ${issue.origin ?? "value"}, ${adj}${issue.maximum.toString()} olmalıydı.`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Fazla küçük: ${issue.origin}, ${adj}${issue.minimum.toString()} ${sizing.unit} sahip olmalıydı.`;
                }
                return `Fazla küçük: ${issue.origin}, ${adj}${issue.minimum.toString()} olmalıydı.`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `Fâsit metin: "${_issue.prefix}" ile başlamalı.`;
                if (_issue.format === "ends_with")
                    return `Fâsit metin: "${_issue.suffix}" ile bitmeli.`;
                if (_issue.format === "includes")
                    return `Fâsit metin: "${_issue.includes}" ihtivâ etmeli.`;
                if (_issue.format === "regex")
                    return `Fâsit metin: ${_issue.pattern} nakşına uymalı.`;
                return `Fâsit ${Nouns[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Fâsit sayı: ${issue.divisor} katı olmalıydı.`;
            case "unrecognized_keys":
                return `Tanınmayan anahtar ${issue.keys.length > 1 ? "s" : ""}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `${issue.origin} için tanınmayan anahtar var.`;
            case "invalid_union":
                return "Giren tanınamadı.";
            case "invalid_element":
                return `${issue.origin} için tanınmayan kıymet var.`;
            default:
                return `Kıymet tanınamadı.`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/******/ // expose the modules object (__webpack_modules__)
/******/ __webpack_require__.m = __webpack_modules__;
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/ensure chunk */
/******/ (() => {
/******/ 	__webpack_require__.f = {};
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = (chunkId) => {
/******/ 		return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 			__webpack_require__.f[key](chunkId, promises);
/******/ 			return promises;
/******/ 		}, []));
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/get javascript chunk filename */
/******/ (() => {
/******/ 	// This function allow to reference async chunks
/******/ 	__webpack_require__.u = (chunkId) => {
/******/ 		// return url for filenames based on template
/******/ 		return "index." + "2bcc45044e30ec33622c" + ".chunk.js";
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/get mini-css chunk filename */
/******/ (() => {
/******/ 	// This function allow to reference async chunks
/******/ 	__webpack_require__.miniCssF = (chunkId) => {
/******/ 		// return url for filenames based on template
/******/ 		return undefined;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/load script */
/******/ (() => {
/******/ 	var inProgress = {};
/******/ 	// data-webpack is not used as build has no uniqueName
/******/ 	// loadScript function to load a script via script tag
/******/ 	__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 		if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 		var script, needAttach;
/******/ 		if(key !== undefined) {
/******/ 			var scripts = document.getElementsByTagName("script");
/******/ 			for(var i = 0; i < scripts.length; i++) {
/******/ 				var s = scripts[i];
/******/ 				if(s.getAttribute("src") == url) { script = s; break; }
/******/ 			}
/******/ 		}
/******/ 		if(!script) {
/******/ 			needAttach = true;
/******/ 			script = document.createElement('script');
/******/ 	
/******/ 			script.charset = 'utf-8';
/******/ 			script.timeout = 120;
/******/ 			if (__webpack_require__.nc) {
/******/ 				script.setAttribute("nonce", __webpack_require__.nc);
/******/ 			}
/******/ 	
/******/ 	
/******/ 			script.src = url;
/******/ 		}
/******/ 		inProgress[url] = [done];
/******/ 		var onScriptComplete = (prev, event) => {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var doneFns = inProgress[url];
/******/ 			delete inProgress[url];
/******/ 			script.parentNode && script.parentNode.removeChild(script);
/******/ 			doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 			if(prev) return prev(event);
/******/ 		}
/******/ 		var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 		script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 		script.onload = onScriptComplete.bind(null, script.onload);
/******/ 		needAttach && document.head.appendChild(script);
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/publicPath */
/******/ (() => {
/******/ 	__webpack_require__.p = "";
/******/ })();
/******/ 
/******/ /* webpack/runtime/jsonp chunk loading */
/******/ (() => {
/******/ 	// no baseURI
/******/ 	
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		792: 0
/******/ 	};
/******/ 	
/******/ 	__webpack_require__.f.j = (chunkId, promises) => {
/******/ 			// JSONP chunk loading for javascript
/******/ 			var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 			if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 	
/******/ 				// a Promise means "currently loading".
/******/ 				if(installedChunkData) {
/******/ 					promises.push(installedChunkData[2]);
/******/ 				} else {
/******/ 					if(true) { // all chunks have JS
/******/ 						// setup Promise in chunk cache
/******/ 						var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 						promises.push(installedChunkData[2] = promise);
/******/ 	
/******/ 						// start chunk loading
/******/ 						var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 						// create error before stack unwound to get useful stacktrace later
/******/ 						var error = new Error();
/******/ 						var loadingEnded = (event) => {
/******/ 							if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 								installedChunkData = installedChunks[chunkId];
/******/ 								if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 								if(installedChunkData) {
/******/ 									var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 									var realSrc = event && event.target && event.target.src;
/******/ 									error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 									error.name = 'ChunkLoadError';
/******/ 									error.type = errorType;
/******/ 									error.request = realSrc;
/******/ 									installedChunkData[1](error);
/******/ 								}
/******/ 							}
/******/ 						};
/******/ 						__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 	};
/******/ 	
/******/ 	// no prefetching
/******/ 	
/******/ 	// no preloaded
/******/ 	
/******/ 	// no HMR
/******/ 	
/******/ 	// no HMR manifest
/******/ 	
/******/ 	// no on chunks loaded
/******/ 	
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 		var [chunkIds, moreModules, runtime] = data;
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0;
/******/ 		if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 		}
/******/ 		if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				installedChunks[chunkId][0]();
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 	
/******/ 	}
/******/ 	
/******/ 	var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 	chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 	chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (ALARIC_NSFW_MVU_v2)
/* harmony export */ });
/* harmony import */ var _lifecycle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4458);
// ALARIC NSFW ENGINE + MVU 控制台 (TypeScript重构版本)
// 使用项目最佳实践：jQuery + Zod + Tavern Helper API

// Initialize the script
_lifecycle__WEBPACK_IMPORTED_MODULE_0__.lifecycleManager.initialize();
// Export script metadata for Tavern Helper
/* harmony default export */ const ALARIC_NSFW_MVU_v2 = ({
    name: 'ALARIC NSFW ENGINE + MVU 控制台 (TypeScript版本)',
    version: '2.0.0',
    author: 'AI Assistant (基于用户需求重构)',
    description: '基于TypeScript重构的ALRIC NSFW引擎，使用jQuery、Zod数据验证和Tavern Helper API',
    features: [
        '🎲 智能NSFW玩法生成',
        '📊 MVU数据集成',
        '🔒 Zod数据验证',
        '⚡ jQuery DOM操作',
        '🎯 Tavern Helper API优先',
        '🛡️ 类型安全',
        '📝 完整生命周期管理'
    ],
    dependencies: [
        'Tavern Helper (推荐)',
        'MVU Plugin (必需)',
        'jQuery (内置)',
        'Zod (内置)'
    ],
    changelog: {
        '2.0.0': [
            '🔄 完全重构为TypeScript',
            '✅ 添加Zod数据验证',
            '🎯 使用Tavern Helper API',
            '⚡ 优化jQuery集成',
            '🛡️ 增强类型安全',
            '📦 模块化架构'
        ]
    }
});

