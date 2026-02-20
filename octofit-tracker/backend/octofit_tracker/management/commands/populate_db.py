from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='marvel', description='Marvel superheroes')
        dc = Team.objects.create(name='dc', description='DC superheroes')

        # Create Users
        users = [
            User(email='ironman@marvel.com', name='Iron Man', team=marvel.name),
            User(email='captainamerica@marvel.com', name='Captain America', team=marvel.name),
            User(email='batman@dc.com', name='Batman', team=dc.name),
            User(email='wonderwoman@dc.com', name='Wonder Woman', team=dc.name),
        ]
        for user in users:
            user.save()

        # Create Activities
        Activity.objects.create(user=users[0], activity_type='run', duration=30, date=timezone.now().date())
        Activity.objects.create(user=users[1], activity_type='cycle', duration=45, date=timezone.now().date())
        Activity.objects.create(user=users[2], activity_type='swim', duration=25, date=timezone.now().date())
        Activity.objects.create(user=users[3], activity_type='yoga', duration=60, date=timezone.now().date())

        # Create Workouts
        Workout.objects.create(name='Pushups', description='Upper body strength', suggested_for='marvel')
        Workout.objects.create(name='Squats', description='Lower body strength', suggested_for='dc')

        # Create Leaderboard
        Leaderboard.objects.create(team=marvel, points=150)
        Leaderboard.objects.create(team=dc, points=120)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
