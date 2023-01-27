function _0x4b21(t, e) {
	var n = _0x19c6();
	return (_0x4b21 = function (t, e) {
		return n[(t -= 490)];
	})(t, e);
}
function _0x58bc() {
	var t = [
		"Wolken: ",
		"rain_",
		"humidity",
		"log",
		"1091811GIezxz",
		"2mRqFHM",
		"getCurrentPosition",
		"7811454tvfYKl",
		"79468byBSsO",
		"temperatur_feels_like",
		"100px",
		"time_",
		"6dceyKs",
		"244cRoJZc",
		"humidity_",
		"31nCEJRo",
		"cloud: ",
		"sunrise",
		"clouds",
		"4ieblPl",
		"icon_hrs_",
		"clouds_",
		"15px",
		"createElement",
		"longitude",
		"POST",
		"310VXWJvO",
		"width",
		"5035041iAYylU",
		"push",
		"20px",
		"icon",
		"time",
		"2957410bsffsV",
		"temp_max_",
		"city",
		"styles/icons/sunrise.png",
		"1JxOGUG",
		"current_weather",
		"weather_description_",
		"day",
		"Temperatur: ",
		"3009297fdVwcG",
		"geolocation",
		"3240066xKEfGg",
		"day_pred_",
		"Gefühlt: ",
		"18615tcEmAX",
		"current",
		"textContent",
		"img",
		"coords",
		"latitude",
		"height",
		"rain",
		"application/json",
		"2283564ukekzY",
		"status",
		"4242904BpzGxl",
		"forecast",
		"230dQYHko",
		"UV Index: ",
		"setAttribute",
		"1762686SeJyfZ",
		"1015842TywVXI",
		"5085MocCwR",
		"style",
		"2567224gmQVAC",
		"temp: ",
		"99AspKLT",
		"859855aLkpjM",
		"Luftfeuchtigkeit: ",
		"37103AInXpc",
		"415264hqDHZX",
		"auto",
		"getElementById",
		"alt",
		"shift",
		"parse",
		"week",
		"temperature",
		"icon_",
		"sunset",
		"humi: ",
		"stringify",
		"styles/icons/sync.png",
	];
	return (_0x58bc = function () {
		return t;
	})();
}
function _0x19c6() {
	var t = _0xf636,
		e = _0x529e,
		n = [
			e(142),
			e(172),
			t(280),
			t(298),
			t(306),
			e(157),
			e(144),
			e(148),
			e(158),
			e(194),
			e(134),
			t(269),
			t(317),
			t(322),
			e(187),
			e(135),
			e(171),
			e(166),
			t(315),
			e(168),
			e(203),
			"rain: ",
			e(169),
			e(146),
			e(155),
			e(156),
			e(159),
			e(200),
			e(178),
			e(164),
			e(150),
			e(189),
			e(193),
			e(162),
			t(289),
			e(145),
			t(276),
			e(196),
			t(320),
			e(184),
			e(177),
			e(198),
			t(325),
			e(153),
			e(161),
			t(271),
			t(266),
			e(174),
			t(301),
			e(195),
			e(140),
			e(137),
			t(282),
			e(185),
			t(278),
			e(175),
			"temp",
			t(300),
			e(143),
			e(176),
			t(328),
			e(136),
			e(180),
			e(147),
			e(186),
			e(202),
			t(261),
			t(324),
			"201823JUXIUT",
			e(182),
			e(192),
			t(262),
			e(181),
			e(199),
			t(281),
		];
	return (_0x19c6 = function () {
		return n;
	})();
}
function _0x529e(t, e) {
	var n = _0x35fc();
	return (_0x529e = function (t, e) {
		return n[(t -= 134)];
	})(t, e);
}
async function getLocation() {
	var t = _0x529e,
		e = _0x4b21;
	navigator[e(546)] &&
		navigator[t(159)][e(533)](async function (n) {
			var r = _0xf636,
				c = t,
				o = e;
			let a = { latitude: n[o(519)][o(497)], longitude: n[o(519)][o(495)] },
				u = await fetch(c(163), {
					method: o(514),
					body: JSON[o(510)](a),
					headers: { "Content-Type": o(506) },
				});
			if (200 === u[c(149)]) {
				var s = await u[o(525)]();
				(s = JSON[c(197)](s)),
					console[o(557)](s),
					(document[c(187)](o(529))[o(559)] = s[o(499)][o(529)]),
					(document[c(187)](o(503))[o(559)] = o(490) + s[o(499)][o(503)] + "°C"),
					(document[o(534)](o(562))[o(559)] = o(556) + s[c(204)][c(141)] + "°C"),
					(document[o(534)](o(540))[o(559)] = s[r(278)][o(540)]),
					(document[o(534)](o(492))[o(559)] = o(493) + s[o(499)][o(492)] + "%"),
					(document[o(534)](o(520))[o(559)] = o(508) + s[o(499)][c(142)] + "%"),
					(document[c(187)](o(517))[o(559)] = " " + s[o(499)][o(517)]),
					(document[c(187)](o(536))[c(184)] = " " + s[o(499)][o(536)]),
					(document[c(187)](c(195))[o(559)] = " " + s[c(204)][o(494)]),
					(document[c(187)](c(151))[o(507)] = s[o(499)][c(138)]),
					(document[o(534)](c(167))[o(559)] = s[c(204)][o(540)]),
					(document[c(187)]("uv")[c(184)] = o(539) + s.uv);
				var i = document[o(544)](o(522));
				(i[o(507)] = o(538)),
					document[o(534)](o(517))[o(551)](i),
					(i[c(135)][o(549)] = c(154)),
					(i[o(535)][o(553)] = c(193)),
					(i[o(524)] = "");
				var p = document[o(544)](r(280));
				(p[o(507)] = o(491)),
					document[o(534)](r(333))[c(189)](p),
					(p[c(135)][o(549)] = o(552)),
					(p[o(535)][r(257)] = o(560)),
					(p[o(524)] = "");
				var d = document[o(544)](o(522));
				(d[o(507)] = o(504)),
					document[o(534)](o(494))[o(551)](d),
					(d[o(535)][c(164)] = o(552)),
					(d[o(535)][c(162)] = o(560)),
					(d[o(524)] = "");
				for (let t = 1; t < 9; t++)
					(document[o(534)](r(327) + t)[o(559)] = s[o(498)][o(554) + t][o(516)]),
						(document[o(534)](o(509) + t)[o(507)] = s[c(185)][o(554) + t][o(511)]),
						document[r(305)](c(186) + t)[o(530)](o(549), o(548)),
						document[o(534)](o(509) + t)[o(530)](r(257), o(548)),
						(document[c(187)](o(531) + t)[o(559)] = s[o(498)][o(554) + t][o(526)]),
						(document[o(534)](o(527) + t)[o(559)] = o(523) + s[o(498)][c(205) + t][o(501)] + "°C"),
						(document[o(534)](o(563) + t)[o(559)] = o(561) + s[o(498)][o(554) + t][c(174)]),
						(document[o(534)](o(532) + t)[o(559)] = o(541) + s[r(270)][c(205) + t][o(555)]),
						(document[o(534)](o(496) + t)[o(559)] = o(564) + s[o(498)][o(554) + t][c(142)]);
				for (let t = 1; t < 6; t++)
					(document[o(534)](o(542) + t)[o(559)] = s[o(537)][t - 1][0]),
						(document[o(534)]("temp_min_" + t)[o(559)] = s[o(537)][t - 1][2]),
						(document[o(534)](r(264) + t)[o(559)] = s[o(537)][t - 1][3]),
						(document[o(534)](o(543) + t)[o(507)] = s[o(537)][t - 1][4]);
			}
		});
}
function _0x35fc() {
	var t = _0xf636,
		e = [
			t(265),
			t(312),
			t(319),
			t(308),
			t(313),
			t(321),
			"8stLEKU",
			t(307),
			t(314),
			"weather_description",
			t(278),
			t(289),
			"8868hcRtuY",
			t(292),
			t(296),
			t(285),
			t(337),
			"icon",
			t(258),
			t(340),
			t(325),
			t(334),
			t(310),
			"description",
			t(284),
			t(311),
			t(316),
			"temp_",
			t(287),
			t(342),
			"icon_current",
			t(290),
			t(330),
			t(338),
			t(339),
			t(302),
			"text",
			"3yXFyFP",
			t(273),
			"8278165vOSWvn",
			t(332),
			"width",
			"https://aexgj5.deta.dev/get_location",
			t(283),
			"3841956IWbKHk",
			t(309),
			t(268),
			t(291),
			t(275),
			t(295),
			t(333),
			t(293),
			t(331),
			t(318),
			t(286),
			"styles/icons/sunset.png",
			t(260),
			t(326),
			t(335),
			"src",
			"last_update",
			t(341),
			t(297),
			t(279),
			"day",
			t(336),
			t(305),
			"77962lasKnP",
			"prepend",
			t(303),
			t(259),
			"13dnmlFt",
			t(304),
		];
	return (_0x35fc = function () {
		return e;
	})();
}
function _0xf636(t, e) {
	var n = _0x58bc();
	return (_0xf636 = function (t, e) {
		return n[(t -= 257)];
	})(t, e);
}
(function (t, e) {
	for (var n = _0xf636, r = _0x58bc(); ; )
		try {
			if (
				819168 ===
				(-parseInt(n(267)) / 1) * (parseInt(n(274)) / 2) +
					-parseInt(n(272)) / 3 +
					(-parseInt(n(329)) / 4) * (parseInt(n(277)) / 5) +
					-parseInt(n(294)) / 6 +
					parseInt(n(323)) / 7 +
					-parseInt(n(288)) / 8 +
					(parseInt(n(299)) / 9) * (parseInt(n(263)) / 10)
			)
				break;
			r.push(r.shift());
		} catch (t) {
			r.push(r.shift());
		}
})(),
	(function (t, e) {
		for (var n = _0xf636, r = _0x529e, c = _0x35fc(); ; )
			try {
				if (
					804405 ===
					(-parseInt(r(173)) / 1) * (parseInt(r(188)) / 2) +
						(-parseInt(r(165)) / 3) * (parseInt(r(179)) / 4) +
						(-parseInt(r(170)) / 5) * (parseInt(r(206)) / 6) +
						-parseInt(r(160)) / 7 +
						parseInt(r(190)) / 8 +
						parseInt(r(139)) / 9 +
						(-parseInt(r(152)) / 10) * (-parseInt(r(183)) / 11)
				)
					break;
				c[n(259)](c[n(307)]());
			} catch (t) {
				c[n(259)](c[n(307)]());
			}
	})(),
	(function (t, e) {
		for (var n = _0xf636, r = _0x529e, c = _0x4b21, o = _0x19c6(); ; )
			try {
				if (
					106686 ===
					(parseInt(c(513)) / 1) * (parseInt(c(518)) / 2) +
						(-parseInt(c(528)) / 3) * (-parseInt(c(512)) / 4) +
						-parseInt(c(502)) / 5 +
						(parseInt(c(505)) / 6) * (parseInt(c(558)) / 7) +
						(parseInt(c(547)) / 8) * (parseInt(c(521)) / 9) +
						(parseInt(c(550)) / 10) * (-parseInt(c(545)) / 11) +
						(parseInt(c(500)) / 12) * (-parseInt(c(515)) / 13)
				)
					break;
				o[n(259)](o[r(201)]());
			} catch (t) {
				o[r(191)](o[r(201)]());
			}
	})(),
	getLocation(),
	setInterval(getLocation, 6e5);
