//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide["in"] = data[0];
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(115);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }

            var checkioInput = data.in;

            if (data.error) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.output').html(data.error.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
                return false;
            }

            var rightResult = data.ext["answer"];
            var userResult = data.out;
            var result = data.ext["result"];
            var result_message = data.ext["result_addon"][1];
            var result_draw = data.ext["result_addon"][0];


            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];

            $content.find('.output').html(result_message + "<br>" + JSON.stringify(userResult));

            if (!result) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.answer').html('Right variant:&nbsp;' + JSON.stringify(rightResult[0]));
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
                $content.find('.call').html('Pass: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.answer').remove();
            }

            if (result_draw) {
                var canvas = new DigitsDoupletDiv();
                canvas.createDiv($content.find(".explanation"), checkioInput, userResult);
            }

            this_e.setAnimationHeight($content.height() + 60);

        });

        //This is for Tryit (but not necessary)
//        var $tryit;
//        ext.set_console_process_ret(function (this_e, ret) {
//            $tryit.find(".checkio-result").html("Result<br>" + ret);
//        });
//
//        ext.set_generate_animation_panel(function (this_e) {
//            $tryit = $(this_e.setHtmlTryIt(ext.get_template('tryit'))).find('.tryit-content');
//            $tryit.find('.bn-check').click(function (e) {
//                e.preventDefault();
//                this_e.sendToConsoleCheckiO("something");
//                e.stopPropagation();
//                return false;
//            });
//        });

        function DigitsDoupletDiv(options) {
            options = options || {};
            var colorOrange4 = "#F0801A";
            var colorOrange3 = "#FA8F00";
            var colorOrange2 = "#FAA600";
            var colorOrange1 = "#FABA00";

            var colorBlue4 = "#294270";
            var colorBlue3 = "#006CA9";
            var colorBlue2 = "#65A1CF";
            var colorBlue1 = "#8FC7ED";

            var colorGrey4 = "#737370";
            var colorGrey3 = "#9D9E9E";
            var colorGrey2 = "#C5C6C6";
            var colorGrey1 = "#EBEDED";

            var colorWhite = "#FFFFFF";

            var root;

            function countDiff(f, s) {
                f = String(f);
                s = String(s);
                if (f.length !== s.length) {
                    return 0;
                }
                var r = 0;
                for (var i = 0; i < f.length; i++) {
                    if (f[i] !== s[i]) {
                        r++;
                    }
                }
                return r;
            }

            this.createDiv = function(dom, numbers, chain) {
                root = dom;
                for (var i = 0; i < chain.length; i++) {
                    var numb = chain[i];
                    var span = $("<span></span>").addClass("no-wrap");
                    var $numb = $("<span></span>").html(numb);
                    var $arr = $("<span></span>").html("&nbsp&rArr; ");
                    if (numbers.indexOf(numb) === -1) {
                        $numb.addClass("wrong-number");
                    }
                    if (i === 0 || i === (chain.length - 1)) {
                        span.addClass("edge-number");
                    }
                    span.append($numb);
                    if (i !== (chain.length - 1)) {
                        if (countDiff(chain[i], chain[i+1]) !== 1) {
                            $arr.addClass("wrong-number");
                        }
                        span.append($arr);
                    }

                    root.append(span);


                }
            }


        }


        //Your Additional functions or objects inside scope
        //
        //
        //


    }
);
