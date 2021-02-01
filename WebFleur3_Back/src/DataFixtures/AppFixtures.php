<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Products;
use App\Repository\CategoryRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Faker\Generator;

class AppFixtures extends Fixture
{
    /** @var ObjectManager */
    private $manager;
    /** @var Generator */
    protected $faker;
    protected $categoryRepository;
    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function load(ObjectManager $manager)
    {
        for ($i = 0; $i < 3; $i++) {
            $categorie = new Category();
            $categorie->setName('categorie' .$i);
            $manager->persist($categorie);
        }
        $manager->flush();

        $this->manager = $manager;
        $this->faker = Factory::create();
        for ($i = 0; $i < 20; $i++) {
            $currentCat = $this->categoryRepository->findOneBy(["name"=>'categorie0']);
            $product = new Products();
            $product->setName('Plante ' .$i);
            $product->setPrice(mt_rand(1000,10000));
            $product->setDescription($this->faker->text(40));
            $product->setCategory($currentCat);
            $product->setPicture('f9efc6c0949db4fd32fcdf4645cdfb5b75bcf2de.png');
            $manager->persist($product);
        }
        $manager->flush();
    }
}