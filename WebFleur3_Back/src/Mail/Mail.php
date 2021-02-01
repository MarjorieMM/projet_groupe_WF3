<?php

namespace App\Mail;

use Mailjet\Client;
use Mailjet\Resources;

class Mail
{
    private $api_key = 'e65e96e4bb6b2319fc33c7f34b8c3e16';
    private $api_key_secret = 'cd64fb77c7e925f3c43f258f2c0ec90d';

    public function send($to_email, $to_name, $subject, $content)
    {
        $mj = new Client($this->api_key, $this->api_key_secret, true, ['version' => 'v3.1']);
        // corps du mail
        $body = [
            'Messages' => [
                [
                    'From' => [
                        'Email' => 'projetwf3mnj@gmail.com',
                        'Name' => 'Web Fleur 3',
                    ],
                    'To' => [
                        [
                            'Email' => $to_email,
                            'Name' => $to_name,
                        ],
                    ],
                    'TemplateID' => 2290226,
                    'TemplateLanguage' => true,
                    'Subject' => $subject,
                    'Variables' => [
                        'content' => $content,
                    ],
                ],
            ],
        ];
        //envoi du mail
        $response = $mj->post(Resources::$Email, ['body' => $body]);
        $response->success() && dd($response->getData());
    }
}