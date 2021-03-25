function chatbot_init(args){
    let start = args.start;
    let api_url = args.api_url;
    let first_msg = args.first_msg;
    let auto_start = args.auto_start;

    if(!api_url){
        throw("Please provide a api string during initialization");
        return;
    }

    if(!first_msg){
        throw("Please provide a intial message during initialization")
        return;
    }

    if(start){
        const chatBotStyle = document.createElement('style');
        let chatBotCss = `
            .int_bot_container{position: fixed; bottom: 3px; right:20px; font-family: sans-serif;  z-index: 999999;}
            .int_bot_action{ width: 50px; height: 50px; border-radius: 50%;background:#e94343; border: 0; padding: 5px;float:right; margin: 10px 0; cursor: pointer; box-shadow: #333333 0 0 5px;}
            .int_bot_action img{width: 65%;}
            .int_bot_action:focus{outline: none;}
            .int_bot_action:hover{background:#e94343;}
            .clr{clear: both;}
            .int_bot_footer{padding:10px 15px;background:#efefef; border-radius: 0 0 8px 8px; display: flex;  justify-content:space-between; }
            textarea.int_bot_new_message{background:none; border: 0; resize: none;  font-family:  sans-serif;  font-size: 16px; width: 100%; height: 22px; min-height: 22px;
                padding: 0 !important; border-radius: 0 !important; margin: 0 !important;}
            textarea.int_bot_new_message:focus{border: 0; box-shadow: none; outline: none;}
            .int_bot_new_message:focus{outline: none;}
            button.int_bot_send{border: 0; display: none; padding: 0 !important; border-radius: 0 !important; background: none !important;
                font-size: inherit !important; }
            .int_bot_header{background: #e94343; padding:10px 15px;border-radius: 8px 8px 0 0; } 
            .int_bot_header h2{padding: 0; margin: 0; font-size: 18px;color: #f5faff;} 
            .int_bot_header span{padding: 0; margin:3px 0 0 0; font-size: 13px;color: #39fd5a;} 
            .int_bot_box{width: 350px;  background: #fffeff; box-shadow: rgba(63, 63, 63, 0.5) 0px 0px 10px; border-radius: 8px; display: none;}
            .int_bot_conversation{padding: 15px; max-height: 45vh; min-height: 45vh; overflow: auto; font-size: 16px; line-height: 20px;}
            .int_msg_out{ margin-bottom: 15px;} 
            .int_msg_out_con{ max-width: 80%; float: right;}
            .int_msg_out_con p{background: #ff7e82; border:#ff7e82 solid 1px; border-radius: 5px 5px 0 5px; color: #f6fbff;padding: 5px 10px 5px 10px; margin: 0;}

            .int_msg_in{ margin-bottom: 15px;}
            .int_msg_in_con{max-width: 80%; float: left;}
            .int_msg_in_con p{background: #f7ebee; border:#efeeef solid 1px; border-radius: 0 5px 5px 5px; color: #3b3a3b;padding: 5px 10px 5px 10px; width: margin: 0;}
            .int_msg_option{background: #ff7e82;  border-radius:15px; color: #f6fbff;padding: 5px 10px 5px 10px; text-decoration: none; display: inline-block; margin: 3px 0; }
            .int_msg_option:hover{background: #e94343;  color: #f6fbff;text-decoration: none;  }
            .int_smg_img{width: 100%;}
            /* .int_typing_icon{ padding: 0 10px !important; background: #fdfdfd !important; border: 0 !important;} */
            .int_back_btn{background: #ff7e82;  border-radius:15px; color: #f6fbff;padding: 5px 10px 5px 10px; text-decoration: none; }
            .int_back_btn:hover{background: #e94343; }
            .int_waiting_icon { margin-bottom: 15px;}

            /*Huge thanks to @tobiasahlin at http://tobiasahlin.com/spinkit/ */
            .int_typing_icon {
                margin: 10px auto 0;
                width: 70px;
                text-align: center;
            }
            
            .int_typing_icon > div {
                width: 18px;
                height: 18px;
                background-color: #333;
            
                border-radius: 100%;
                display: inline-block;
                -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
                animation: sk-bouncedelay 1.4s infinite ease-in-out both;
            }
            
            .int_typing_icon .bounce1 {
                -webkit-animation-delay: -0.32s;
                animation-delay: -0.32s;
            }
            
            .int_typing_icon .bounce2 {
                -webkit-animation-delay: -0.16s;
                animation-delay: -0.16s;
            }
            
            @-webkit-keyframes sk-bouncedelay {
                0%, 80%, 100% { -webkit-transform: scale(0) }
                40% { -webkit-transform: scale(1.0) }
            }
            
            @keyframes sk-bouncedelay {
                0%, 80%, 100% { 
                -webkit-transform: scale(0);
                transform: scale(0);
                } 40% { 
                -webkit-transform: scale(1.0);
                transform: scale(1.0);
                }
        }`;
        chatBotStyle.innerHTML = chatBotCss;
        document.head.appendChild(chatBotStyle);

        const link = document.createElement('link');
        link.href = "https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";
        document.head.appendChild(link);

        let str_chatbot_div = 
            `<div class="int_bot_container">
                <div class="int_bot_box">
                    <div class="int_bot_header">
                        <h2>Ask Ruby</h2>
                        <span>Online</span>

                    </div>

                    <div class="int_bot_conversation">
                        
                    </div>

                    <div class="int_bot_footer">
                        <textarea class="int_bot_new_message" name="message" placeholder="Type a message..."
                            autocomplete="off"></textarea>

                        <button type="submit" class="int_bot_send"><img alt="send" width="25px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAKp0lEQVR4Xu1baWxU1xU+961+M14wGErDUmxsDDYYgwlFbUBRImiJ8qdKRRIaN5TICciEUKqmLT9aqaoa1DQJa5pWqE23SF2iSpSgKg2pWqniR2hSUQxeAa+MN4w925t5y+133wyWMa0ZzAy2wdd6njdvmXfPd8/ynXvPI5pu0whMIzCNwP2MwIcPLj53cve2I2c/+mfhfYlD/SKFt5X7w6eLlJ6Tm9adqn/3xKb7CQh2frnBlQgnySaSVYlfdflg76yFrdlbtv/qoZe/9fq9DgZrXqpzbsVJcgACYxTnRDFVIVNVY5YkDXRvqP7T2ud3HJxfubLhXgTjJgAcl8iSJXJklWxJorCj8RyF9QeKSs4b2/ccWf/lrX+4l4BgF0t17thxYi4nGZK5AICRRAThXY69LJuGQkQ+v0acx6gna+5l/SvfPLKgZuehT8/0WVMdDHaxROMuABANFkBcAAAzUPCFu+KATrYR9Y47Fr7rBg2SxXtnzGtmlY/8o7T2xR8Xr1xVP1WBYK3FGrcBAAabOAZeaIAEAKAAOIANzjGKE4acQy5FydZdUnGxHcXg56pwnr7+tvlLLuTW7j2w9omn351qQLC2YoVbtp0EgJHDhdQJAMSuomeTEgqRrAEIB8egLAq0wIJK6I5NQckhIwv+wtaCjdlz243ttT/duHvvoakCBLtcokADMMyeCTBoQAIAoQ0CAFk4RaH+WUQGvIRhahR2LYoqNuWpGpkytAegcEWHNrgky7p5MW9WW9/6jaeqavbsLy1f3jaZwWDNJTJ3HcdTexnu7zoA2PUAkPAZx/DLrnCKMUQHTkYSmEF4TZ9tkONGSVUTYsZwzpV9FCfFthgfCi986Ez+C1t/tnJL9aQ0D3ZxscTRIKzYEo4wnc1WoEGWL9I1u/SCvvVrvy6urj48vyAfOjU5WsYBUKEaAcciH4DIc7IjTcx/tfvRRz6sfH7vD8pWP9g00TDcAEAmOhOFf/DlGGTaMU/LslU/mY7kDGZpfbGC3ED27kP7Vn/p8ZOZeHYqv5lxALLijBRFoRDiaQRxVfgPQZ/gS+laDswjKlNoZsXHyldfePvhF3ccTqXT6byGtRQxzweMbCIajD423of6ZYX6YjYYJZEGp2lH4WwBiM58ZEfiFPKbMA2iiC1Rx4wFl2MbNr9ftK3mQPmaqgvjfebt3JdxACyEUwQOYoi0IsIqhoYIgb8YkV+HNsRl6lAcykekcWIAJEcj3SwImHPKG6SXnjtateWpjOYeNwEgRt/jAaO04nZQHX2tSBhEmJTg+22A4EATJBNO0ZVpUHaISTJp5CcwMrLIJAd24kJLXIdRQF3QlLez5q3ZT1X/pLBgHvQnvY01F3qEd7ilG4A4KKUSdykLQsZd6DoIhogMFvZjiAwaAweBo7QEKDhrQFMiAEts+XGJggbodlR1A9kF7dFHN58seXbHG6WVK9MWPdilIo8FAwUQHcF+xD60QHxzkRhwECAmhg4dxICB9Ah1hmPDUMKsKa7gIHc8DoFLvU00kVAJ1ZeThMrBCYcwqjjAYQ8K7hE/G8PtCq5TueyxTqF5DsNzcZ8jklLBQoVPQnruOCoNSjl95rLKM7Orn/1FxZNP//5O9YGdWV7AuaByDuZCHFeRGfcrntE6AMAmXaTJ+JRBc9GvhJAK4BHXgD5K0O/krsefvaQKQDLsCzhDmoXfgIAYfHFdAmChBx5MeAyYpGxDyDgB1wQZw59MOjYVWhLEUCQYqYggGjQkxhUa1HPNiJHT6dS8fGD1liff8s8uSPD522zDvK/rWsB3tbtn3rXLrWXhxktlocbmskhnz6L59R+s0jiYPuiyjvRYkiQGrVYdJ8ws2yRjWBiAghNi1DgSJQXaIwS2uEYqhhHpktc14Q+EH/CSDWiEBIco3I63icMCgOtA4VOHs3QVRpYKvyAgS17r4H4bNNNkGsLprI7gFzafWF77jVeWFJbcVu6RMvFt6rwyo7f9cnmwpWWZ29hYTg31pdTevmDOwMdlCnooQ7eZUA/YOoeYHAmTBNByRKKEjNEGGjZ0HH7NAwaOnzSgJdJrYVY21ELAJLkK/jtwivgGDYvDXDiw80xMmOF104DJKEwlpjG6FoqSawB8C3fNX3s6d8939i97YvPxVJQhZQDG+rEr3Sbr6e0s6m1rWhm+WF/FG+rWaI1NJWp375wCp9nPEeMZNk+5MYQy7F92Y9jgB8gH4cQnuAKQgeF5WiLcpQBLNCSeSe1Duq4AMKFlOOb5EABjQHgjplHExME8PItJ1JpdXK8/U/vmhpd2jkmu0gLAWOD0XbWkoaGhnJ5A5+L+1qaKWPP5z+oN56r8zfWLje7ATF2NkJ1MwVVZhlvhpNoWwLGEyyRLmA8coAQ0Ypi8Fak5LiMNJiBDHSwD2oWZKszckeQn6sHkbk4UXALne/NM6pYf6NA2PnZ8ybba1xdVrGoZ3deMA3ArNQx3BnL6+vuLOzrblvW3NK2zGuvW+ZrqluR3NOXNCA545gL/m9AEgKHAjGR8wrq8jUdApmbJNBAXPgrkCtcNITyF8ZlvGRR34qRmK04gbJmhpes+Wrjru68se/yL71/v14QDcCuAnNa6wmsdHeWR5sYqt+HcJrvu358zW+qJBQcpC2RJwYJGCKTKwSyVgjClRmIewwwlKAdFNQnaocAPCe0Cv7BYqGte4SVj63PHVz2z641k1L5VNyb8fDDZgzsdMEA1TPxAw0hM805sgwnMhQk8kDSBz8ME1mTABMIwgThM4JOkCXxw10wg6QTz4QQXwAmWJ53gWjjBUjjBGRl0ghxO0IITbIMTPAEn+CqcYFdGnGAyDBYjDJYhDFYiDK5GGFyCMPgphMH8CQiDQwiDLQiDBxEGfzmWjqdsAiBCuSBCFSBCK0CEVoAILQUR+gyIUBGIEEISplQnnggFQYT+BSK0D0TodCrGfQMA5xrOCiq8OkmFV4AKF4IKrwMVlkZQYW/NAFSYJgkVjoEKd4IKvwcqvA9UGAt5qbfryVAI1CuGZCgbyZA+RZKhEJKhgEiG1tfWHk1d5BuvnKrp8CdIh4+lJR2eIhMihAmRK5gQeQ8TIt/HhEj7eEf8pigwelI03TNC4oF3OCXWhSmxo2t3ffuH6RJ65O9M1knRICZFL2BS9DAmRX+TCcGHidAkmxYfwLT4XzAtvh/T4mczKfgwACPXBjPxwBQXRs5jYeTnWBh5LRN9GJMIZRqA/7M0Rlgai2BprAtLY3uxNPbnuy34/9SATKwOj1ocdbA4OojF0VNYHN2HxdHmiRL8rgGQXB7nWB6vx/L42w9/ffePJlroG6JABgskkGzzULJA4hgKJH47mQQf1oAMlMjEUSITQInMX1Ei8z2UyHRORsGHAUhjkZQ5okjqrnvz8YKcjjK5AZTJNSTL5H433o5M1H3jLZQkFEpeQqHk31EouR+FklO2jng8pbJdKJU9iFLZV1Eqe2NlxUQN4x08N5ViaUKxdAjF0nUolj6EYul37uB5k+7WscrlsSojhVEu/0eUy7+Gcvn/TLrep6FDo1+YMPHCRAwvTLThhYl3imt2HZqb78fayz3ckq/McLwyM4hXZv6GV2Yeu4fFvVk0vDTF8dLUMbw0VXFfCT4t7DQC0whMIzCNANF/AToTPnNgIzIwAAAAAElFTkSuQmCC"></button>

                    </div>

                </div>

                <button type="button" class="int_bot_action">
                    <img id="open_close" value="chatting" alt="chatting" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUVFNkVEMUM4MTZCMTFFQkFGODVGNDA4ODkwRDcwNTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUVFNkVEMUQ4MTZCMTFFQkFGODVGNDA4ODkwRDcwNTIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5RUU2RUQxQTgxNkIxMUVCQUY4NUY0MDg4OTBENzA1MiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5RUU2RUQxQjgxNkIxMUVCQUY4NUY0MDg4OTBENzA1MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnFA92MAAAIPSURBVHja3NdPSBRxFMDxmWVVrF0worYgS0mK8FCBNy+CHvbStbzULeoQaNDZi7dIiC4dFKNDB4+i0KGLLHiQoEWEoENIC1qBSKK1f6r9+f3pG1jG2Z3f7Iw74IMP7ujs+pv3e+/tjK2UsuKMhBVzOAsYwQrKUBH5jKTfAmy2YJifH/RrbMgiwsYltOMMfjU8kwUsq8O4p+shInn5zC6/c/UW3MZPzMVVA50oxlWE9YrkNHLoNfyc37iPpajaUP8+HfBCklFmYBfXIsz0C9yU1xXk8RJbllTreoQd4O6CBArqaPzAlUZpeyL9bBIlvJZuckcV13FRjjvwFA8xVS8DGVRVsHgUYA4ksYOtehnQVzKEjGEG/sg0NY1/2EZPoy3IhSg62xm0cXwb6vl/9aDCLWun2TbUcRmD6K65Ir9ow12k8MboHR5FeAqvUFHNxwJSPq2q/6dyZ0B/Mb3DDUmhvoqvJntZU1xr+Gi8YbLib3iGshwv4nzEw8kzA5YrdUWMwXadPIHR41qAM3BW0e9xYlr+/uk4FqBr4Dn+Y1JGqjuK4oK0bTXKnrUNb8vfI4tpzOKvaYmhIAXtjnU9CU3T1YfvIdpyDXe8tsAO8GByFo/RH+DmIyFT8ZYcz2Bc7qACZSCsLDYlG18wUNsFrXIO87IIPWVLrV6A4wH2nOKwY3o41aP+bZA2PLlPx/sCDADoseJG8BQJkAAAAABJRU5ErkJggg==">
                </button>

            </div>`;

        const chatBotDiv = document.createElement('div');
        chatBotDiv.classList.add('int_bot_container');
        chatBotDiv.innerHTML = str_chatbot_div;
        document.body.appendChild(chatBotDiv);

        function chatbot_container_auto_scroll() {
            var messageBody = document.querySelector('.int_bot_conversation');
            messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
        }

        request_body = {
            "sender": "",
            "message": ""
        }

        if (localStorage.getItem("username")) {
            previous_user = 1
            request_body.sender = localStorage.getItem("username")
        } else {
            previous_user = 0
            username = GetUserName();
            localStorage.setItem("username", username);
            request_body.sender = username
            previous_conversations = []
        }


        $(".int_bot_action").click(function () {
            $(".int_bot_box").toggle();
            $('.int_bot_conversation').empty();
            switch ($('#open_close').attr('value')) {
                case 'chatting':
                    $('#open_close').attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDM0OUVGMjc4MzIyMTFFQkEzQjNCMTMzQUIwQzBCNkEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDM0OUVGMjg4MzIyMTFFQkEzQjNCMTMzQUIwQzBCNkEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEMzQ5RUYyNTgzMjIxMUVCQTNCM0IxMzNBQjBDMEI2QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEMzQ5RUYyNjgzMjIxMUVCQTNCM0IxMzNBQjBDMEI2QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ppx79EkAAAKeSURBVHja3JvPTsJAEIcrEhVuPAkXQzTeQOQ/8YAHH8IYEy+e1afwxkEOejDqQ3gz8aRH9RVURCV1Rkui0Ha37c50dyf5haS7hX4f0DQ7bcZ13TxkF3IHOYEUIY6lWYEMIM+QQ0gBNx64/2sIqVkI34WMpliPceDBnS3bJPjBYz1mHMe5dWZrCXIBqTnmVxdyBlnwGbtBO6uQT9e/TP8lBH3zrrd9eTKxJ5CwYSE8jjt/d7BJghT8tABbJEjD+wkwXUIk+CABpkqIDB8mQEZC1XR4kQBTJMSGlxGgu4RE8LICdJWQGD6KAJGEN2YJSuCjCpCRsG4SfBwBaUtQCh9XQFoSlMMnEcAtgQQ+qQAZCRWd4VUIoJZACq9KAJUEcniVAlRLYIFXLUCVBDZ4CgEyEsq6wFMJiCuBHZ5SQFQJqcBTCxBJePUkpAaPmfuxQFs9yACS9RkbQuYDmhYfkC3IJeXBZRk6M+feq5+EXMA+LPBYGab2FErYhnxJzGWD5xQgK4EVnlsA1gtkHDI+9uY4Ngqoex3nxZA5eE64gpRtEyADP6k85JpLQiZl+FHAOSHHJYFaQEMAvxlyYpxIqJAeIeFVVgPyHnCFh9vrzCtLrJfCUeBTlaALfGoSuOEbmiy0kghoKoBnX3LXEZ5Vgq7wbBJ0hmeRkOTAWgL4JuPyWpVbACc8qYS48CNmeLI7VUyCJ5GgEr7FeIuMMgmyH9gWLF1zwiu9mdNUeGUSTIZXIsF0+MQSgt6wI4Bva3izdCwJtsDLSqiJBJgMH0uCbfCRJcjCdwyCjyQBJ5YshJeVUMS+wF5If77ntapMrbCGLD4cuoMC1iyFl5FQQgF9i+FFEvr4PylAjiBP7u+j5SWD//Oi4GPCp5B7yD4k/y3AAEFNMoJrnmCNAAAAAElFTkSuQmCC');
                    $('#open_close').attr('value', 'close')
                    $('.int_bot_action').css("background-color", "black");
                    break;
                case 'close':
                    $('#open_close').attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUVFNkVEMUM4MTZCMTFFQkFGODVGNDA4ODkwRDcwNTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUVFNkVEMUQ4MTZCMTFFQkFGODVGNDA4ODkwRDcwNTIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5RUU2RUQxQTgxNkIxMUVCQUY4NUY0MDg4OTBENzA1MiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5RUU2RUQxQjgxNkIxMUVCQUY4NUY0MDg4OTBENzA1MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnFA92MAAAIPSURBVHja3NdPSBRxFMDxmWVVrF0worYgS0mK8FCBNy+CHvbStbzULeoQaNDZi7dIiC4dFKNDB4+i0KGLLHiQoEWEoENIC1qBSKK1f6r9+f3pG1jG2Z3f7Iw74IMP7ujs+pv3e+/tjK2UsuKMhBVzOAsYwQrKUBH5jKTfAmy2YJifH/RrbMgiwsYltOMMfjU8kwUsq8O4p+shInn5zC6/c/UW3MZPzMVVA50oxlWE9YrkNHLoNfyc37iPpajaUP8+HfBCklFmYBfXIsz0C9yU1xXk8RJbllTreoQd4O6CBArqaPzAlUZpeyL9bBIlvJZuckcV13FRjjvwFA8xVS8DGVRVsHgUYA4ksYOtehnQVzKEjGEG/sg0NY1/2EZPoy3IhSg62xm0cXwb6vl/9aDCLWun2TbUcRmD6K65Ir9ow12k8MboHR5FeAqvUFHNxwJSPq2q/6dyZ0B/Mb3DDUmhvoqvJntZU1xr+Gi8YbLib3iGshwv4nzEw8kzA5YrdUWMwXadPIHR41qAM3BW0e9xYlr+/uk4FqBr4Dn+Y1JGqjuK4oK0bTXKnrUNb8vfI4tpzOKvaYmhIAXtjnU9CU3T1YfvIdpyDXe8tsAO8GByFo/RH+DmIyFT8ZYcz2Bc7qACZSCsLDYlG18wUNsFrXIO87IIPWVLrV6A4wH2nOKwY3o41aP+bZA2PLlPx/sCDADoseJG8BQJkAAAAABJRU5ErkJggg==');
                    $('#open_close').attr('value', 'chatting')
                    $('.int_bot_action').css("background-color", "#e94343");
                    break;
            }
        });
        //sring temp for further use
        str_url = api_url


        str_int_msg_out = '<div class="int_msg_out">'
        str_int_msg_in_con = '<div class="int_msg_in_con">'
        str_clr = '<div class="clr"></div></div>'
        str_clr_optn = '<div class="clr"></div>'
        str_int_msg_in = '<div class="int_msg_in">'
        str_int_msg_out_con = '<div class="int_msg_out_con">'
        str_waiting_icon = `<div class="int_typing_icon">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>`
        str_int_msg_out_icon = '<div class="int_waiting_icon">'

        function bot_text_res(text) {
            //$(".int_bot_box").toggle();
            text_str_response = `<p class="res">${text}</p></div>`
            $('.int_bot_conversation').last().append(str_int_msg_out);
            $('.int_msg_out').last().append(str_int_msg_in_con);
            $('.int_msg_in_con').last().append(text_str_response);
            $('.int_msg_in_con').last().after(str_clr);

        }


        // creating button fcuntion
        function bot_button_res(btns_array) {
            let button = btns_array
            $('.int_bot_conversation').last().append(str_int_msg_out);
            $('.int_msg_out').last().append(str_int_msg_in_con);
            button.forEach(function (item, index) {
                btn_text = item.title
                btn_playload = item.payload
                if (btn_text == 'Go Back') {
                    bot_back_button_res(btn_text, btn_playload)
                } else {
                    text_btn_response = `<a class="int_msg_option res" href="${btn_playload}">${btn_text}</a>`
                    $('.int_msg_in_con').last().append(text_btn_response);
                }
                $('.int_msg_in_con').last().after(str_clr);
            });
        }


        function bot_back_button_res(text, payload) {
            $('.int_bot_conversation').last().append(str_int_msg_out);
            $('.int_msg_out').last().append(str_int_msg_in_con);
            text_btn_response = `<a class="int_back_btn res" href="${payload}">${text} <img width="13" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjMxNDEyNDg4ODg2MTFFQjkyMjU4NDM5QkMzNURFMUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjMxNDEyNDk4ODg2MTFFQjkyMjU4NDM5QkMzNURFMUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGMzE0MTI0Njg4ODYxMUVCOTIyNTg0MzlCQzM1REUxQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGMzE0MTI0Nzg4ODYxMUVCOTIyNTg0MzlCQzM1REUxQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhUmcSUAAAFgSURBVHjaYvz//z8DLQETA40BNgv4gfgAEM+nhgUsaHxWIF4HxPZA/JUqXgDFARJe9B8C7gKxKJocWRiZ0wQ1/A0Qq1HDcGQLkqCGfwdiK2oZDsKMQCIKGFKLoBHeBsRHSA1lIH4AxLegbIw4+PGfOuATEO8AYh10H+wH2uMAxN+B+BAQ/yAjrSgAsTY0Vf4E4log7ob5gAVqMwicB2IeMsObE4gbgfgX1Kx45EjmBeILUIltQMxMQcS6Q835AMSyyBLSQPwYKjmTwtQzG2pOG7qELhB/hEqWUGCBLdSMXdgkXaDheIkCC0Dx+A+UaVmwpIg9QGwIxL8oKIH4gJgRiD+x4FBwlcIizhRKn6FFfcAMxDVQ9mEGapY70DzVD43gi0DMRi2DFYA4FIjPQg0HFT/6yBktE4h/U6lMOg9N7mCzWZBKxB/QGo2BzNL0DBAfBeK5QPwbJsk45FsVAAEGAKjA0W/LnV8HAAAAAElFTkSuQmCC"></img></a>`
            $('.int_msg_in_con').last().append(text_btn_response);
        }

        //creating image fucntion
        function bot_image_res(image) {
            //$(".int_bot_box").toggle();
            text_str_response = `<p class="res"><img src="${image}" alt="img" width="200" height="200"></p></div>`
            $('.int_bot_conversation').last().append(str_int_msg_out);
            $('.int_msg_out').last().append(str_int_msg_in_con);
            $('.int_msg_in_con').last().append(text_str_response);
            $('.int_msg_in_con').last().after(str_clr);
        }

        //creating video function
        function bot_video_res(video_src) {
            text_str_response = `<p class="res"><iframe width="300" height="200" src="${video_src}"?></iframe></p></div>`
            $('.int_bot_conversation').last().append(str_int_msg_out);
            $('.int_msg_out').last().append(str_int_msg_in_con);
            $('.int_msg_in_con').last().append(text_str_response);
            $('.int_msg_in_con').last().after(str_clr);

        }

        //ajax call function
        function ajax_call(str_url) {
            $.ajax({
                url: str_url,
                type: 'POST',
                processData: false,
                contentType: false,
                data: JSON.stringify(request_body),
                beforeSend: function () {
                    $('.int_bot_conversation').last().append(str_int_msg_out_icon);
                    $('.int_waiting_icon').last().append(str_int_msg_in_con);
                    $('.int_msg_in_con').last().append(str_waiting_icon);
                    $('.int_msg_in_con').last().after(str_clr);
                    chatbot_container_auto_scroll()
                },
                success: function (data) {
                    $('.int_waiting_icon').remove();
                    previous_conversations.push(data)
                    localStorage.setItem("previous_conversations", JSON.stringify(previous_conversations));
                    data.forEach(function (item, index) {
                        if (item.hasOwnProperty('text')) {
                            bot_text_res(item.text)
                        }
                        if (item.hasOwnProperty('buttons')) {
                            bot_button_res(item.buttons)
                        }
                        if (item.hasOwnProperty('image')) {
                            bot_image_res(item.image)
                        }
                        chatbot_container_auto_scroll()
                    });
                },
                afterSend: function () {
                }
            });
        }

        //getting href values of 'a' on click in the chat window 
        $(document).on('click', 'a.res', function (e) {
            e.preventDefault();
            var new_messege = $(this).attr('href');
            var button_text = $(this).text()
            request_body.message = new_messege
            user_res_render(button_text)
            user_res_object = {
                recipient_id: "user_res",
                text: button_text
            }
            user_res_array = []
            user_res_array.push(user_res_object)
            previous_conversations.push(user_res_array)
            localStorage.setItem("previous_conversations", JSON.stringify(previous_conversations));
            chatbot_container_auto_scroll()
            ajax_call(str_url)

        });


        //generating random username 
        function GetUserName() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        }

        //getting the input msg and calling api
        $(".int_bot_send").click(function () {
            user_input_text = $(".int_bot_new_message").val();
            $(".int_bot_new_message").val('');
            text_str_response = `<p class="res">${user_input_text}</p></div>`
            $('.int_bot_conversation').last().append(str_int_msg_in);
            $('.int_msg_in').last().append(str_int_msg_out_con);
            $('.int_msg_out_con').last().append(text_str_response);
            $('.int_msg_out_con').last().after(str_clr);
            chatbot_container_auto_scroll()
            user_res_object = {
                recipient_id: "user_res",
                text: user_input_text
            }
            user_res_array = []
            user_res_array.push(user_res_object)
            previous_conversations.push(user_res_array)
            localStorage.setItem("previous_conversations", JSON.stringify(previous_conversations));
            request_body.message = user_input_text
            ajax_call(str_url)
        });


        $('.int_bot_new_message').keypress(function (event) {
            $(".int_bot_send").show();
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                event.preventDefault();
                user_input_text = $(".int_bot_new_message").val();
                text_str_response = `<p class="res">${user_input_text}</p></div>`
                $('.int_bot_conversation').last().append(str_int_msg_in);
                $('.int_msg_in').last().append(str_int_msg_out_con);
                $('.int_msg_out_con').last().append(text_str_response);
                $('.int_msg_out_con').last().after(str_clr);
                user_res_object = {
                    recipient_id: "user_res",
                    text: user_input_text
                }
                user_res_array = []
                user_res_array.push(user_res_object)
                previous_conversations.push(user_res_array)
                localStorage.setItem("previous_conversations", JSON.stringify(previous_conversations));
                request_body.message = user_input_text
                ajax_call(str_url)
                $(this).val('');
                chatbot_container_auto_scroll()
                return false;
            }
        });

        // calling api for first time automatically
        $(".int_bot_action").click(function () {
            if (previous_user == 0 && localStorage.getItem("username")) {
                request_body.message = first_msg
                ajax_call(str_url)
                previous_user = 1
            } else {
                previous_conversations = JSON.parse(localStorage.getItem("previous_conversations"))
                if (previous_conversations === null) {
                    previous_conversations = []
                    request_body.message = first_msg
                    ajax_call(str_url)
                }
                previous_conversations.forEach(function (data, index) {
                    data.forEach(function (item, index) {
                        if (item.recipient_id == "user_res") {
                            user_res_render(item.text)
                        } else {
                            if (item.hasOwnProperty('text')) {
                                bot_text_res(item.text)
                            }
                            if (item.hasOwnProperty('buttons')) {
                                bot_button_res(item.buttons)
                            }
                            if (item.hasOwnProperty('image')) {
                                bot_image_res(item.image)
                            }
                        }
                    });
                });
                chatbot_container_auto_scroll()
            }
        });

        //fucntion for rendering user selected button in the chat window
        function user_res_render(button_text) {
            text_str_response = `<p class="res">${button_text}</p></div>`
            $('.int_bot_conversation').last().append(str_int_msg_in);
            $('.int_msg_in').last().append(str_int_msg_out_con);
            $('.int_msg_out_con').last().append(text_str_response);
            $('.int_msg_out_con').last().after(str_clr);
        }

        if (auto_start) {
            //opening chatbot automatically after 10 seconds
            setTimeout(function () {
                if ($('#open_close').attr('value') == 'chatting') {
                    $(".int_bot_action").trigger('click');
                }
            }, 5000);
        }
    }
}