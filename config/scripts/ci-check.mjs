const ci_check = () => {
  if (!Boolean(process.env.CI)) return 'false';
  else return 'true';
};

process.stdout.write(ci_check());
