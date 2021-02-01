<?php

namespace App\Controller;

use App\Entity\Users;
use App\Mail\Mail;
use App\Repository\UsersRepository;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class UsersController extends AbstractController
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder, TokenStorageInterface $tokenStorageInterface, JWTTokenManagerInterface $jwtManager)
    {
        $this->encoder = $encoder;
        $this->jwtManager = $jwtManager;
        $this->tokenStorageInterface = $tokenStorageInterface;
    }

    /**
     * @Route("/api/users", name="api_users", methods={"GET"})
     */
    public function index(UsersRepository $usersRepository)
    {
        $post = $usersRepository->findAll();

        return $this->json($post, 200, [], ['groups' => 'users']);
    }

    /**
     * @Route("/api/users/login", name="api_login", methods={"POST", "GET"})
     */
    public function login(JWTTokenManagerInterface $JWTManager, TokenStorageInterface $tokenStorage)
    {
        dd($tokenStorage);

        return $this->json($tokenStorage->getToken()->getUser());

        // $user = $this->getUser();

        // return $this->json([
        //     'username' => $user->getUsername(),
        //     'roles' => $user->getRoles(),
        // ]);
    }

    /**
     * @Route("/api/users/account", name="api_account", methods={"GET", "POST"})
     */
    public function sendUser(Request $request, SerializerInterface $serializer, UsersRepository $usersRepository)
    {
        $accountUser = $request->getContent();
        $log = new Users();
        $post = $serializer->deserialize($accountUser, Users::class, 'json');
        $log = $usersRepository->findOneByEmail($post->getEmail());

        return $this->json($log, 200, [], ['groups' => 'users']);
    }

    /**
     * @Route("/api/users/account/{id}", name="api_account_by_id", methods={"GET"})
     */
    public function sendUserById($id, UsersRepository $usersRepository)
    {
        $log = $usersRepository->findOneById($id);

        return $this->json($log, 200, [], ['groups' => 'users']);
    }

    /**
     * @Route("/api/users/register", name="api_register", methods={"POST"})
     */
    public function register(Request $request, SerializerInterface $serializer, EntityManagerInterface $manager, UsersRepository $usersRepository)
    {
        $newUser = $request->getContent();
        try {
            $user = new Users();
            $user = $serializer->deserialize($newUser, Users::class, 'json');
            // vérifie si email existe déjà :
            $emailExists = $usersRepository->findOneByEmail($user->getEmail());
            if ($emailExists) {
                $data = [
                    'type' => 'email_error',
                    'title' => 'Adresse email déjà présente',
                ];

                // return new JsonResponse($data, 400);
                return $this->json($data, 400);
            }
            // on encode le mot de passe puis on entre les infos dans la bdd
            $encoded = $user->setPassword($this->encoder->encodePassword($user, $user->getPassword()));
            $manager->persist($encoded);
            $manager->flush();

            // envoi du mail

            $mail = new Mail();
            $content = 'Bonjour '.$user->getFirstname().'<br> Bienvenue sur la boutique Web Fleur 3. <br> Votre compte a bien été crée';
            $mail->send($user->getEmail(), $user->getFirstname(), 'Bienvenue sur Web Fleur 3', $content);

            //on envoie les infos du nouveau user au front
            return $this->json($user, 201, [], ['groups' => 'users']);
        } catch (NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * @Route("/api/users/deleteuser/{id}", name="api_delete_user", methods={"DELETE"})
     */
    public function deleteuser($id, EntityManagerInterface $manager, UsersRepository $usersRepository)
    {
        $delId = $usersRepository->findOneById($id);

        $manager->remove($delId);
        $manager->flush();

        return new \Symfony\Component\HttpFoundation\JsonResponse([]);
    }

    /**
     * @Route("/api/users/update/{id}", name="api_update_user", methods={"PUT"})
     */
    public function update($id, Request $request, SerializerInterface $serializer, EntityManagerInterface $manager, UsersRepository $usersRepository)
    {
        $user = $usersRepository->findOneById($id); //mon user en base

        $newUser = $request->getContent(); //les nouvelles infos

        $updUser = $serializer->deserialize($newUser, Users::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $user]);

        $encoded = $updUser->setPassword($this->encoder->encodePassword($updUser, $updUser->getPassword()));

        $manager->persist($encoded);
        $manager->flush();

        return $this->json($user, 201, [], ['groups' => 'users']);
    }
}