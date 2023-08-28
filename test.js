/*! ablejs - v0.2.0 - Wednesday, July 19th, 2023, 5:26:08 PM
 * http://www.ablesky.com
 * Copyright (c) 2023 frontend@ablesky.com; Licensed  */
define(["module", "jquery", "https://cdn1.100cdw.com.cn/common/grtPlayer.1.1.1.js", "common/base64", "ceat/sensors/sensorsdata.min"], function (e, t, a) {
  function i(e) {
    t.extend(_, e), A = e.isShowDot, P = e.isRecordTime, k = e.courseContentId, "undefined" != typeof accountId && (B = "TIME_" + accountId + "_" + k), q = e.isThird, "undefined" != typeof accountId && "undefined" != typeof courseId_jsp && "undefined" != typeof jsp_circleId && (J = "COUNT_" + accountId + "_" + courseId_jsp + "_" + jsp_circleId, n(J)), q && (J = "THIRD_COUNT_" + userId + "_" + courseId_jsp, n(J)), b = _.playEndautoPlay, S = _.url, L = e.isTrial, w = e.trialTime, M = 0 == e.isRest ? !1 : !0, void 0 != e.restTime && (R = e.restTime), v(), window.addEventListener("beforeunload", function () {
      y("play", "end", k)
    })
  }

  function n(e) {
    try {
      $ = Base64.decode(localStorage.getItem(e)), $ = parseInt($)
    } catch (t) {
      console.log("get count error!"), $ = 0
    }
    console.log(">>>>init count=" + $), $ || ($ = 0)
  }

  function o() {
    s(), j = a(D), j.emit("resourceReady", E), j.onTimeUpdate = function () {
      if (null != B && localStorage.setItem(B, parseInt(j.currentTime)), P && !C[k]) {
        $++, console.log(">>count=" + $);
        var e = $ % 60;
        localStorage.setItem(J, Base64.encode($.toString())), $ >= 60 && 0 == e && (console.log(">>>record count=" + $), u(k, !1));
        var t = $ % Q;
        0 == t && y("heartbeat", "", k)
      }
    }, j.on("play", function () {
      t(".video-on-tips").show(), ("answer" == H || "signin" == H) && (y(H, "end", k), H = ""), y("play", "start", k), W || (W = window.setInterval(function () {
        G++, 0 == G % Q && y("heartbeat", "", k)
      }, 1e3))
    }), j.on("pause", function () {
      y("play", "pause", k), ("answer" == H || "signin" == H) && y(H, "start", k)
    }), j.on("ended", function () {
      t(".video-on-tips").hide(), y("play", "end", k), localStorage.setItem(B, 0), exitFullscreen(), b && "function" == typeof b && b(), clearInterval(W)
    })
  }

  function s() {
    d(k), A && h();
    var e = !1;
    t.ajax({
      url: "course.do?action=getCourseContentInfo&courseContentId=" + k,
      dataType: "json",
      type: "get",
      async: !1,
      success: function (t) {
        null != t.videoType && 1 == t.videoType && (e = !0)
      }
    }), N = null == localStorage.getItem(B) ? 0 : parseInt(localStorage.getItem(B)), D = {
      id: "J_CC_videoPlayerDiv",
      url: S,
      width: "100%",
      height: "100%",
      autoplay: !0,
      closeVideoClick: !1,
      countTime: {
        interval: 60,
        cb: function (t) {
          if (t.end) console.log(">>>record count=" + $), P && !C[k] && u(k, !0);
          else {
            O++;
            var a = !1;
            if (void 0 != T[k] && T[k].length > 0)
              for (var i = 0; i < T[k].length; i++) T[k][i].timeSlot == t.time && (a = !0);
            !a && M && R > 0 && 0 == 60 * O % R && !e && (console.log(">>>touch restTime; playCount=" + O), exitFullscreen(), K("您已学习" + Math.round(R / 60) + "分钟了，让眼睛休息一下吧"), videoPause(), H = "signin")
          }
        }
      },
      dotList: I,
      lastPlayTime: N,
      lastPlayTimeHideDelay: 5,
      lastPlayTimeTips: '您上次学习到<span class="xgplayer-lasttime">' + f(N) + "</span>,欢迎继续学习",
      trying2Watch: {
        maxTime: w,
        cb: l
      },
      videoBackground: {
        isCustom: e,
        background: "url(" + IMG_PATH + "/player/download_9adcd2a2.png) center center/40% no-repeat, #000"
      }
    }
  }

  function r() {
    return j.currentTime
  }

  function l(e) {
    exitFullscreen(), X("试听结束"), e.player.currentTime = 0, videoPause()
  }

  function c(e) {
    O = 0, k = e, B = "TIME_" + accountId + "_" + k, s(), j.switchVideo(D, function (e) {
      j = e, j.emit("resourceReady", E), j.onTimeUpdate = function () {
        if (null != B && localStorage.setItem(B, parseInt(j.currentTime)), P && !C[k]) {
          $++, console.log(">>count=" + $);
          var e = $ % 60;
          localStorage.setItem(J, Base64.encode($.toString())), $ >= 60 && 0 == e && (console.log(">>>record count=" + $), u(k, !1))
        }
      }, j.on("play", function () {
        t(".video-on-tips").show(), ("answer" == H || "signin" == H) && (y(H, "end", k), H = ""), y("play", "start", k), W || (W = window.setInterval(function () {
          G++, 0 == G % Q && y("heartbeat", "", k)
        }, 1e3))
      }), j.on("pause", function () {
        t(".video-on-tips").show(), y("play", "pause", k), ("answer" == H || "signin" == H) && y(H, "start", k)
      }), j.on("ended", function () {
        y("play", "end", k), localStorage.setItem(B, 0), exitFullscreen(), b && "function" == typeof b && b(), clearInterval(W)
      }), j.once("complete", function () {
        j.root.classList.remove("xgplayer-is-fullscreen")
      })
    }), W = window.setInterval(function () {
      G++;
      var e = G % Q;
      0 == e && y("heartbeat", "", k)
    }, 1e4)
  }

  function d(e) {
    E = [];
    var a = "#contentListId" + e + " li",
      i = !1;
    t(a).each(function () {
      var e = new Object,
        a = t(this).attr("quality");
      "FLUENT" == a ? (e.name = "流畅", i || (S = t(this).text())) : "SD" == a ? (e.name = "标清", i = !0, S = t(this).text()) : "HD" == a ? e.name = "高清" : "FULL_HD" == a && (e.name = "超清"), e.url = t(this).text(), E.push(e)
    }), t(a).length < 2 && (E = [])
  }

  function u(e, a) {
    if (console.log(">>>>>currPlayCoursecontentId=" + e + "  finishIds[currPlayCoursecontentId]=" + C[e]), "undefined" == typeof C[e] && (C[e] = !1), C[e]) return console.log(">>>finish! courseContentId=" + e), $ = 0, localStorage.setItem(J, Base64.encode("0")), void 0;
    var i = Math.floor($ / 60);
    i = 1 > i ? 1 : i, console.log(">>>>>>>studyMins=" + i);
    var n = {},
      o = "studyLog.do";
    q ? (n = {
      platformId: platformId,
      code: code,
      localUserId: userId,
      id: e,
      finish: a,
      ct: t.now()
    }, o = "thirdPlatform/record") : n = 1 == i ? {
      id: e,
      circleId: jsp_circleId,
      finish: a,
      ct: t.now()
    } : {
      id: e,
      circleId: jsp_circleId,
      finish: a,
      studyMins: i,
      ct: t.now()
    }, t.ajax({
      url: o,
      data: n,
      dataType: "json",
      type: "post",
      success: function (n) {
        n.success ? (n.progress >= 100 ? (C[e] = !0, t("#J_studyProgress_" + e).html("100%")) : (C[e] = !1, t("#J_studyProgress_" + e).html(n.progress + "%")), a || ($ -= 60 * i, $ = 0 > $ ? 0 : $), F = 0, V = 0) : ("nologin" == n.message && (videoPause(), p("请注意! 您的帐号已退出或已在其它地点登录！", 1e3)), "double" == n.message ? 2 > V ? V++ : (videoPause(), count = 0, localStorage.setItem(J, Base64.encode("0")), V = 0, g("系统检测到您正在同时观看多门课程，仅一门课程计时")) : 4 > F ? F++ : (videoPause(), F = 0, localStorage.setItem(J, Base64.encode("0")), g("学时记录出现异常请检查网络")))
      }
    })
  }

  function p(e, a) {
    var i = a || 1e3,
      n = e || "",
      o = t.dialog({
        title: "提示",
        content: "<center>" + n + "</center>",
        width: 400,
        modal: !0,
        buttons: [{
          text: "确定",
          css: {
            backgroundColor: "#cb1812"
          },
          click: function () {
            o.close()
          }
        }],
        close: function () {
          setTimeout(function () {
            window.location.reload()
          }, i)
        }
      })
  }

  function h() {
    return null == k ? (console.log("courseContentId is null"), void 0) : T[k] ? (console.log("testTime has load courseQueTime[" + k + "]=" + JSON.stringify(T[k])), void 0) : (t.ajax({
      url: "course.do?action=getTestDuringCourse",
      data: {
        id: k
      },
      async: !1,
      dataType: "json"
    }).done(function (e) {
      if (e.success)
        if (e.result && e.result.list && e.result.list.length > 0) {
          T[k] = e.result.list;
          for (var t = 0; t < e.result.list.length; t++) {
            var a = {};
            a.time = e.result.list[t].timeSlot, a.cb = m, I.push(a)
          }
        } else T[k] = [];
      else g(e.message)
    }), void 0)
  }

  function m(e) {
    if (void 0 != T[k] && T[k].length > 0)
      for (var t = 0; t < T[k].length; t++) T[k][t].timeSlot == e.time && (H = "answer", exitFullscreen(), veiwExamStart(T[k][t].id, e.time))
  }

  function f(e, t) {
    var a = {};
    a.H = parseInt(e / 3600), a.i = parseInt((e - 3600 * a.H) / 60), a.s = parseInt(e - 3600 * a.H - 60 * a.i), t = "H:i:s", 0 == a.H ? t = "i:s" : a.H < 10 && (a.H = "0" + a.H), a.i < 10 && (a.i = "0" + a.i), a.s < 10 && (a.s = "0" + a.s);
    var i = null;
    return i = "00" == a.H ? t.replace("i", a.i).replace("s", a.s) : t.replace("H", a.H).replace("i", a.i).replace("s", a.s)
  }

  function g(e) {
    var a = t.dialog({
      boxid: "showMessage_boxid",
      title: "提示",
      headStyle: {
        backgroundColor: "#c0130d"
      },
      bodyStyle: {
        backgroundColor: "#F7F7F7"
      },
      footStyle: {
        backgroundColor: "#F7F7F7"
      },
      content: "<center>" + e + "</center>",
      modal: !0,
      width: 370,
      buttons: [{
        text: "知道了",
        css: {
          backgroundColor: "#c0130d"
        },
        click: function () {
          a.close(), -1 != navigator.userAgent.indexOf("Firefox") || -1 != navigator.userAgent.indexOf("Chrome") ? (window.location.href = "about:blank", window.close()) : (window.opener = null, window.open("", "_self"), window.close())
        }
      }]
    });
    t(".dialog-close").hide()
  }

  function v() {
    var e = "",
      a = "";
    t.ajax({
      url: "course.do?action=getSensorsInfo&courseContentId=" + k,
      dataType: "json",
      type: "get",
      async: !1,
      success: function (t) {
        e = t.pointDomain, a = t.accountId, U = t.courseId
      }
    }), q && (a = userId), z.init({
      server_url: e + "/p/dc/sa.gif?project=grt_point&point_type=video_point",
      is_track_single_page: !0,
      use_client_time: !0,
      send_type: "beacon",
      heatmap: {
        clickmap: "not_collect",
        scroll_notice_map: "not_collect"
      }
    }), window.sensors = z, z.registerPage({
      uid: a,
      org_id: 7,
      platform_id: 200,
      client_type: "web"
    })
  }

  function y(e, t, a) {
    var i = x(j.currentTime);
    q && void 0 != accountId && "" != accountId ? z.track("videoPlay", {
      event_type: e,
      event_action: t,
      project_id: platformId,
      course_id: U,
      video_id: a,
      video_play_time: i,
      course_type: "video"
    }) : void 0 != accountId && "" != accountId && z.track("videoPlay", {
      event_type: e,
      event_action: t,
      project_id: jsp_circleId,
      course_id: U,
      video_id: a,
      video_play_time: i,
      course_type: "video"
    })
  }

  function x(e) {
    var t = parseInt(e),
      a = 0,
      i = 0,
      n = 0;
    t > 60 && (a = parseInt(t / 60), t = parseInt(t % 60), a > 60 && (i = parseInt(a / 60), a = parseInt(a % 60), i > 24 && (n = parseInt(i / 24), i = parseInt(i % 24))));
    var o = "";
    return t >= 0 && (o = "" + parseInt(t)), a > 0 && (o = "" + parseInt(a) + ":" + o), i > 0 && (o = "" + parseInt(i) + ":" + o), n > 0 && (o = "" + parseInt(n) + ":" + o), o
  }
  var b, w, _ = e.config(),
    k = null,
    C = [],
    T = [],
    E = [],
    I = [],
    S = "",
    A = !1,
    P = !1,
    D = {},
    j = null,
    N = 0,
    B = null,
    F = 0,
    L = !1,
    M = !0,
    R = 1200,
    O = 0,
    J = null,
    $ = 0,
    q = !1,
    V = 0,
    U = null,
    z = window.sensorsDataAnalytic201505,
    H = "",
    W = null,
    G = 0,
    Q = 30;
  window.videoPause = function () {
    j.pause()
  }, window.videoPlay = function () {
    j.play()
  }, window.exitFullscreen = function () {
    j.fullscreen && j.exitFullscreen(j.root)
  };
  var K = function (e) {
      var a = t.dialog({
        boxid: "rest_tip",
        title: "提示",
        width: 380,
        modal: !0,
        content: '<span style="display:block;text-align: center;">' + e + "</span>",
        buttons: [{
          text: "继续学习",
          css: {
            backgroundColor: "#c0130d"
          },
          click: function () {
            videoPlay(), a.close()
          }
        }]
      })
    },
    X = function (e) {
      var a = t.dialog({
        boxid: "message_tip",
        title: "提示",
        width: 280,
        content: '<span style="display:block;text-align: center;">' + (e ? e : "额，出错啦~~") + "</span>",
        buttons: [{
          text: "确定",
          css: {
            backgroundColor: "#c0130d"
          },
          click: function () {
            videoPlay(), a.close()
          }
        }]
      })
    };
  return {
    init: i,
    switchVideo: c,
    getVideoPostion: r,
    loadingPlayer: o,
    initSensors: v
  }
});