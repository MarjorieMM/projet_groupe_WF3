<?php

namespace App\DataFixtures;

use App\Entity\Admin;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AdminFixtures extends Fixture
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        $admin = new Admin();
        $admin->setFirstname($faker->firstName);
        $admin->setLastname($faker->lastName);
        $admin->setEmail($faker->email);
        $admin->setPassword($this->encoder->encodePassword($admin, 'password'));
        $manager->persist($admin);
        $manager->flush();
    }
}